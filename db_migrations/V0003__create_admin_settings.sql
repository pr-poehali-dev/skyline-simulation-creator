CREATE TABLE IF NOT EXISTS admin_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL
);
INSERT INTO admin_settings (key, value) VALUES ('admin_key', '1009167512Qq')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;