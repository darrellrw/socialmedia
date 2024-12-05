-- TRIGGER

-- Case dari comments
DELIMITER $$ -- Delete comment and its likes
CREATE TRIGGER delete_comment AFTER DELETE ON comments FOR EACH ROW
BEGIN
    DELETE FROM likes WHERE post_id = OLD.post_id;
END $$
DELIMITER ;



-- Case dari posts
DELIMITER $$ -- Delete post and its comments, likes, and reports
CREATE TRIGGER delete_post AFTER DELETE ON posts FOR EACH ROW
BEGIN
    DELETE FROM comments WHERE post_id = OLD.id;
    DELETE FROM reports WHERE post_id = OLD.id;
END $$
DELIMITER ;



-- Case dari users
DELIMITER $$ -- Delete user and its posts, comments, likes, and reports
CREATE TRIGGER delete_user AFTER DELETE ON users FOR EACH ROW
BEGIN
    DELETE FROM posts WHERE user_uuid = OLD.uuid;
END $$
DELIMITER ;

DELIMITER $$ -- Check for duplicate username before insert (Using Function)
CREATE TRIGGER check_username_duplicate_before_insert BEFORE INSERT ON users FOR EACH ROW
BEGIN
    IF check_duplicate_username(NEW.name) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate username is not allowed';
    END IF;
END $$
DELIMITER ;
-- DROP TRIGGER IF EXISTS check_username_duplicate_before_insert;

DELIMITER $$ -- Check for duplicate username before update (Using Function)
CREATE TRIGGER check_username_duplicate_before_update BEFORE UPDATE ON users FOR EACH ROW
BEGIN
    IF NEW.name != OLD.name THEN
        IF check_duplicate_username(NEW.name) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate username is not allowed';
        END IF;
    END IF;
END $$
DELIMITER ;
-- DROP TRIGGER IF EXISTS check_username_duplicate_before_update;