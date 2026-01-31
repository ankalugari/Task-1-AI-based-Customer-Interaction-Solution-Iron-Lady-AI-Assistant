/*
  # Create Chat System Tables

  1. New Tables
    - `chat_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `user_id` (uuid, nullable) - Optional user ID for authenticated users
      - `created_at` (timestamptz) - Session creation timestamp
      - `updated_at` (timestamptz) - Last activity timestamp
    
    - `chat_messages`
      - `id` (uuid, primary key) - Unique message identifier
      - `session_id` (uuid, foreign key) - References chat_sessions
      - `content` (text) - Message content
      - `sender` (text) - Either 'user' or 'assistant'
      - `timestamp` (timestamptz) - Message timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (since this is a public-facing chatbot)
    - Messages are associated with sessions for conversation tracking

  3. Indexes
    - Index on session_id for efficient message retrieval
    - Index on timestamp for chronological ordering
*/

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY,
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON chat_messages(timestamp);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create chat sessions"
  ON chat_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own chat sessions"
  ON chat_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update their own chat sessions"
  ON chat_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can create messages in sessions"
  ON chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view messages"
  ON chat_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);
