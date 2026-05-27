-- Languages table
CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    native_name VARCHAR(50),
    flag_emoji VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- Insert default languages
INSERT INTO languages (code, name, native_name, flag_emoji, is_default) VALUES
('en', 'English', 'English', '🇬🇧', TRUE),
('es', 'Spanish', 'Español', '🇪🇸', FALSE),
('fr', 'French', 'Français', '🇫🇷', FALSE),
('it', 'Italy', 'Italiano', '🇮🇹', FALSE)
