CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(100) NOT NULL,
  event_type VARCHAR(100),
  text TEXT NOT NULL,
  rating SMALLINT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);