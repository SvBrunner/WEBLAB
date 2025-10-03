create table if not exists technology
(
    id          varchar(36)                              not null
        primary key,
    name        varchar(255)                             not null,
    description varchar(255)                             null,
    published   tinyint                                  not null,
    category    varchar(255)                             not null,
    ring        varchar(255)                             null,
    createdAt   datetime(6) default CURRENT_TIMESTAMP(6) not null,
    updatedAt   datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    publishedAt datetime                                 null
);

create table if not exists user
(
    id       varchar(36)  not null
        primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    roles    text         not null
);



INSERT INTO technology (id, name, description, published, category, ring, createdAt, updatedAt, publishedAt)
VALUES
    -- Tools
    (UUID(), 'Jest', 'JavaScript testing framework', 1, 'Tools', 'Trial', NOW(6), NOW(6), NOW()),
    (UUID(), 'ESLint', 'Linting utility for JavaScript', 1, 'Tools', 'Assess', NOW(6), NOW(6), NOW()),
    (UUID(), 'Git', 'Version control system', 1, 'Tools', 'Adopt', NOW(6), NOW(6), NOW()),
    (UUID(), 'Grunt', 'Task runner (legacy)', 1, 'Tools', 'Hold', NOW(6), NOW(6), NOW()),

    -- Techniques
    (UUID(), 'Test-Driven Development', 'Software development practice', 1, 'Techniques', 'Trial', NOW(6), NOW(6),
     NOW()),
    (UUID(), 'Microservices', 'Distributed architectural style', 1, 'Techniques', 'Assess', NOW(6), NOW(6), NOW()),
    (UUID(), 'Continuous Integration', 'Automated build/test practice', 1, 'Techniques', 'Adopt', NOW(6), NOW(6),
     NOW()),
    (UUID(), 'Monolith', 'Single large codebase architecture', 1, 'Techniques', 'Hold', NOW(6), NOW(6), NOW()),

    -- Platforms
    (UUID(), 'AWS', 'Amazon Web Services cloud platform', 1, 'Platforms', 'Trial', NOW(6), NOW(6), NOW()),
    (UUID(), 'Azure', 'Microsoft Azure cloud platform', 1, 'Platforms', 'Assess', NOW(6), NOW(6), NOW()),
    (UUID(), 'Kubernetes', 'Container orchestration platform', 1, 'Platforms', 'Adopt', NOW(6), NOW(6), NOW()),
    (UUID(), 'Heroku', 'PaaS platform (legacy)', 1, 'Platforms', 'Hold', NOW(6), NOW(6), NOW()),

    -- Languages & Frameworks
    (UUID(), 'TypeScript', 'Typed superset of JavaScript', 1, 'Languages & Frameworks', 'Trial', NOW(6), NOW(6), NOW()),
    (UUID(), 'Rust', 'System programming language', 1, 'Languages & Frameworks', 'Assess', NOW(6), NOW(6), NOW()),
    (UUID(), 'Java', 'Popular OOP programming language', 1, 'Languages & Frameworks', 'Adopt', NOW(6), NOW(6), NOW()),
    (UUID(), 'Perl', 'Older scripting language', 1, 'Languages & Frameworks', 'Hold', NOW(6), NOW(6), NOW());

-- Initialize Users
INSERT INTO user (id, username, password, roles)
VALUES (UUID(), 'admin', '$2b$10$j6bMutdnr7kVDqArENeKT.px8ndqzRBrYhfhgDsEnTXEMAv8GbjT6',
        '["user", "admin"]'), -- admin admin
       (UUID(), 'user', '$2b$10$vW2AGWefXRyx2m8pWieDvuI7LAVcxGG6UXOkzISFbWY4KBe7vsIki', '["user"]'); -- user user
