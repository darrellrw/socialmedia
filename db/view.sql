-- VIEW
CREATE VIEW post_details AS -- Post details view using functions
SELECT 
    p.id AS post_id, 
    p.title, 
    p.description, 
    p.image, 
    u.name AS author_name, 
    likes_count(p.id) AS like_count,
    comment_count(p.id) AS comment_count
FROM posts p
JOIN users u ON p.user_uuid = u.uuid;

CREATE VIEW post_reports AS -- Post reports view
SELECT
    r.id AS report_id,
    p.title AS post_title,
    u.name AS reported_by,
    r.reason,
    r.created_at
FROM reports r
JOIN posts p ON r.post_id = p.id
JOIN users u ON r.user_uuid = u.uuid;

CREATE VIEW post_like_details AS -- Post like details view
SELECT
    l.post_id,
    u.uuid AS user_uuid,
    u.name AS user_name,
    l.created_at AS like_date
FROM
    likes l
JOIN users u ON l.user_uuid = u.uuid;

CREATE VIEW post_comment_details AS -- Post comment details view
SELECT
    c.post_id,
    u.uuid AS user_uuid,
    u.name AS user_name,
    c.comment,
    c.created_at AS comment_date
FROM
    comments c
JOIN users u ON c.user_uuid = u.uuid;

CREATE VIEW user_like_posts AS -- Get post liked by user
SELECT 
    u.uuid AS user_uuid,
    u.name AS user_name,
    p.id AS post_id,
    p.title AS post_title,
    p.description AS post_description,
    p.created_at AS post_created_at,
    l.created_at AS liked_at
FROM 
    likes l
JOIN 
    posts p ON l.post_id = p.id
JOIN 
    users u ON l.user_uuid = u.uuid;