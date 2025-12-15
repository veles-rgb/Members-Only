require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function resetDb() {
    const client = await pool.connect();
    try {
        const dbInfo = await client.query("SELECT current_database() AS db, current_schema() AS schema");
        console.log("Connected to:", dbInfo.rows[0]);

        await client.query("BEGIN");

        // Drop
        await client.query("DROP TABLE IF EXISTS public.messages CASCADE;");
        await client.query("DROP TABLE IF EXISTS public.users CASCADE;");

        // Recreate
        await client.query(`
      CREATE TABLE public.users (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL CHECK (length(name) >= 1),
        username VARCHAR(50) NOT NULL UNIQUE CHECK (length(username) >= 3),
        password_hash TEXT NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

        await client.query(`
      CREATE TABLE public.messages (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL CHECK (length(title) >= 1),
        message TEXT NOT NULL CHECK (length(message) >= 1 AND length(message) <= 2000),
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE
      );
    `);

        await client.query("CREATE INDEX idx_messages_user_id ON public.messages(user_id);");

        await client.query("COMMIT");
        console.log("✅ Reset complete.");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("❌ Reset failed:", err.message);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

resetDb();
