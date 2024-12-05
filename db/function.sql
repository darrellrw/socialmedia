-- FUNCTION
DELIMITER $$ -- Count likes
CREATE FUNCTION likes_count(p_post_id INT) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE like_count INT;
    SELECT COUNT(*) INTO like_count FROM likes WHERE post_id = p_post_id;
    RETURN like_count;
END $$
DELIMITER ;
-- DROP FUNCTION IF EXISTS likes_count;

DELIMITER $$ -- Count comment
CREATE FUNCTION comment_count(p_post_id INT) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE comment_count INT; 
    SELECT COUNT(*) INTO comment_count FROM comments WHERE post_id = p_post_id;
    RETURN comment_count;
END $$
DELIMITER ;

DELIMITER $$ -- Count post reports
CREATE FUNCTION report_count_post(p_comment_id INT) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE report_count INT;
    SELECT COUNT(*) INTO report_count FROM reports WHERE post_id = p_comment_id;
    RETURN report_count;
END $$
DELIMITER ;

DELIMITER $$ -- Check for duplicate username
CREATE FUNCTION check_duplicate_username(p_username VARCHAR(255)) RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE user_count INT;
    
    SELECT COUNT(*) INTO user_count FROM users WHERE name = p_username;

    IF user_count > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END $$
DELIMITER ;
-- DROP FUNCTION IF EXISTS check_duplicate_username;

DELIMITER $$ -- Count user posts
CREATE FUNCTION user_post_count(p_user_id INT) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE post_count INT;
    SELECT COUNT(*) INTO post_count FROM posts WHERE user_id = p_user_id;
    RETURN post_count;
END $$