-- STORED PROCEDURE
-- Transaction masuk di stored procedured

-- Case dari comments
DELIMITER $$ -- Get all comments
CREATE PROCEDURE get_all_comments()
BEGIN
    START TRANSACTION;
    SELECT * FROM comments;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get comment by post id
CREATE PROCEDURE get_comments_by_post(IN p_post_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM comments WHERE post_id = p_post_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get comment by id
CREATE PROCEDURE get_comment_by_id(IN p_comment_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM comments WHERE id = p_comment_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get comments by user
CREATE PROCEDURE get_comments_by_user(IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    SELECT * FROM comments WHERE user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Add comment
CREATE PROCEDURE add_comment(
    IN p_post_id INT,
    IN p_user_uuid CHAR(36),
    IN p_comment TEXT
)
BEGIN
    START TRANSACTION;
    INSERT INTO comments (post_id, user_uuid, comment) 
    VALUES (p_post_id, p_user_uuid, p_comment);
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update comment
CREATE PROCEDURE update_comment(
    IN p_comment_id INT,
    IN p_comment TEXT,
    IN p_user_uuid CHAR(36)
)
BEGIN
    START TRANSACTION;
    UPDATE comments SET comment = p_comment WHERE id = p_comment_id AND user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Delete comment
CREATE PROCEDURE delete_comment(IN p_comment_id INT)
BEGIN
    START TRANSACTION;
    DELETE FROM comments WHERE id = p_comment_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Count comments by post
CREATE PROCEDURE count_comments_by_post(IN p_post_id INT, OUT p_comment_count INT)
BEGIN
    START TRANSACTION;
    SET p_comment_count = comment_count(p_post_id);
    COMMIT;
END $$
DELIMITER ;


-- Case dari likes
DELIMITER $$ -- Get all likes
CREATE PROCEDURE get_all_likes()
BEGIN
    START TRANSACTION;
    SELECT * FROM likes;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get like by id
CREATE PROCEDURE get_like_by_id(IN p_like_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM likes WHERE id = p_like_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get likes by post
CREATE PROCEDURE get_likes_by_post(IN p_post_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM likes WHERE post_id = p_post_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get likes by user
CREATE PROCEDURE get_likes_by_user(IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    SELECT * FROM likes WHERE user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Add like
CREATE PROCEDURE add_like(
    IN p_post_id INT,
    IN p_user_uuid CHAR(36)
)
BEGIN
    START TRANSACTION;
    INSERT INTO likes (post_id, user_uuid) 
    VALUES (p_post_id, p_user_uuid);
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Delete like
CREATE PROCEDURE delete_like(
    IN p_like_id INT,
    IN p_user_uuid CHAR(36)
)
BEGIN
    START TRANSACTION;
    DELETE FROM likes WHERE id = p_like_id AND user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Count likes by post
CREATE PROCEDURE count_likes_by_post(IN p_post_id INT, OUT p_like_count INT)
BEGIN
    START TRANSACTION;
    SET p_like_count = likes_count(p_post_id);
    COMMIT;
END $$
DELIMITER ;


-- Case dari posts
DELIMITER $$ -- Get all posts
CREATE PROCEDURE get_all_posts()
BEGIN
    START TRANSACTION;
    SELECT * FROM posts;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get post by id
CREATE PROCEDURE get_post_by_id(IN p_post_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM posts WHERE id = p_post_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get posts by user
CREATE PROCEDURE get_posts_by_user(IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    SELECT * FROM posts WHERE user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Serach post by title or description
CREATE PROCEDURE search_post(IN p_search TEXT)
BEGIN
    START TRANSACTION;
    SELECT * FROM posts WHERE title LIKE CONCAT('%', p_search, '%') OR description LIKE CONCAT('%', p_search, '%');
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Add post
CREATE PROCEDURE add_post(
    IN p_user_uuid CHAR(36),
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_image TEXT
)
BEGIN
    START TRANSACTION;
    INSERT INTO posts (user_uuid, title, description, image) 
    VALUES (p_user_uuid, p_title, p_description, p_image);
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update post
CREATE PROCEDURE update_post(
    IN p_post_id INT,
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_image TEXT
)
BEGIN
    START TRANSACTION;
    UPDATE posts SET title = p_title, description = p_description, image = p_image WHERE id = p_post_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Delete post menggunakan transaction
CREATE PROCEDURE delete_post(IN p_post_id INT, IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    DELETE FROM posts WHERE id = p_post_id AND user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Count posts by user
CREATE PROCEDURE count_posts_by_user(IN p_user_uuid CHAR(36), OUT p_post_count INT)
BEGIN
    START TRANSACTION;
    SET p_post_count = user_post_count(p_user_uuid);
    COMMIT;
END $$



-- Case dari reports
DELIMITER $$ -- Get reports
CREATE PROCEDURE get_reports(IN p_report_id INT)
BEGIN
    START TRANSACTION;
    IF p_report_id IS NULL THEN
        SELECT * FROM reports;
    ELSE
        SELECT * FROM reports WHERE id = p_report_id;
    END IF;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get reports by post
CREATE PROCEDURE get_reports_by_post(IN p_post_id INT)
BEGIN
    START TRANSACTION;
    SELECT * FROM reports WHERE post_id = p_post_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Get reports by user
CREATE PROCEDURE get_reports_by_user(IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    SELECT * FROM reports WHERE user_uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Add report post
CREATE PROCEDURE report_post(
    IN p_post_id INT,
    IN p_user_uuid CHAR(36),
    IN p_reason TEXT
)
BEGIN
    START TRANSACTION;
    INSERT INTO reports (post_id, user_uuid, reason) 
    VALUES (p_post_id, p_user_uuid, p_reason);
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Delete post
CREATE PROCEDURE delete_report(IN p_report_id INT)
BEGIN
    START TRANSACTION;
    DELETE FROM reports WHERE id = p_report_id;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Count reports by post
CREATE PROCEDURE count_reports_by_post(IN p_post_id INT, OUT p_report_count INT)
BEGIN
    START TRANSACTION;
    SET p_report_count = report_count_post(p_post_id);
    COMMIT;
END $$
DELIMITER ;



-- Case dari users
DELIMITER $$ -- Get User data
CREATE PROCEDURE get_user_data(IN user_uuid CHAR(36)) 
BEGIN 
    START TRANSACTION;
    IF user_uuid IS NULL THEN 
        SELECT uuid, name, email, gender, description FROM users; 
    ELSE 
        SELECT uuid, name, email, gender, description FROM users WHERE uuid = uuid; 
    END IF; 
    COMMIT;
END $$ 
DELIMITER ;
-- DROP PROCEDURE IF EXISTS get_user_data;

DELIMITER $$ -- Register
CREATE PROCEDURE register_user(
    IN p_uuid CHAR(36),
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_gender BOOLEAN
)
BEGIN
    START TRANSACTION;
    INSERT INTO users (uuid, name, email, password, gender)
    VALUES (p_uuid, p_name, p_email, p_password, p_gender);
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Login
CREATE PROCEDURE login_user(
    IN p_email VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    SELECT * FROM users WHERE email = p_email;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Logout
CREATE PROCEDURE logout_user(
    IN p_user_uuid CHAR(36)
)
BEGIN
    START TRANSACTION;
    UPDATE users SET refresh_token = NULL WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update user data by uuid
CREATE PROCEDURE update_user_data(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_description TEXT,
    IN p_gender BOOLEAN,
    IN p_user_uuid CHAR(36)
)
BEGIN
    START TRANSACTION;
    UPDATE users SET name = p_name, email = p_email, gender = p_gender, description = p_description WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update user password
CREATE PROCEDURE update_user_password(
    IN p_user_uuid CHAR(36),
    IN p_password VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    UPDATE users SET password = p_password WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update user role
CREATE PROCEDURE update_user_role(
    IN p_user_uuid CHAR(36),
    IN p_role INT(10)
)
BEGIN
    START TRANSACTION;
    UPDATE users SET role = p_role WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Update user profile picture
CREATE PROCEDURE update_user_profile_picture(
    IN p_user_uuid CHAR(36),
    IN p_profile_picture VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    UPDATE users SET profile_picture = p_profile_picture WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Delete user data and all related data dengan transaction
CREATE PROCEDURE delete_user(IN p_user_uuid CHAR(36))
BEGIN
    START TRANSACTION;
    DELETE FROM users WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;
-- DROP PROCEDURE IF EXISTS delete_user;

DELIMITER $$ -- Update refresh token
CREATE PROCEDURE update_refresh_token(
    IN p_user_uuid CHAR(36),
    IN p_refresh_token TEXT
)
BEGIN
    START TRANSACTION;
    UPDATE users SET refresh_token = p_refresh_token WHERE uuid = p_user_uuid;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$ -- Search refresh token
CREATE PROCEDURE search_refresh_token(
    IN p_refresh_token TEXT
)
BEGIN
    START TRANSACTION;
    SELECT * FROM users WHERE refresh_token = p_refresh_token;
    COMMIT;
END $$
DELIMITER ;