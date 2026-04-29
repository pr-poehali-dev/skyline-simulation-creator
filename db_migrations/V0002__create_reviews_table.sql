CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) DEFAULT '',
    text TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);