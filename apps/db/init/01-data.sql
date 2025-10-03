-- Seed technology with 16 rows (Category × Ring) only if the table is empty
INSERT INTO technology (id, name, description, published, category, ring, createdAt, updatedAt, publishedAt)
SELECT *
FROM (
         -- Tools
         SELECT UUID(),
                'Jest',
                'JavaScript testing framework',
                1,
                'Tools',
                'Trial',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'ESLint',
                'Linting utility for JavaScript',
                1,
                'Tools',
                'Assess',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Git',
                'Version control system',
                1,
                'Tools',
                'Adopt',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Grunt',
                'Task runner (legacy)',
                1,
                'Tools',
                'Hold',
                NOW(6),
                NOW(6),
                NOW()
         -- Techniques
         UNION ALL
         SELECT UUID(),
                'TDD',
                'Software development practice',
                1,
                'Techniques',
                'Trial',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Microservices',
                'Distributed style',
                1,
                'Techniques',
                'Assess',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'CI',
                'Automated build/test',
                1,
                'Techniques',
                'Adopt',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Monolith',
                'Single codebase architecture',
                1,
                'Techniques',
                'Hold',
                NOW(6),
                NOW(6),
                NOW()
         -- Platforms
         UNION ALL
         SELECT UUID(),
                'AWS',
                'Cloud platform',
                1,
                'Platforms',
                'Trial',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Azure',
                'Cloud platform',
                1,
                'Platforms',
                'Assess',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Kubernetes',
                'Container orchestration',
                1,
                'Platforms',
                'Adopt',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Heroku',
                'PaaS (legacy)',
                1,
                'Platforms',
                'Hold',
                NOW(6),
                NOW(6),
                NOW()
         -- Languages & Frameworks
         UNION ALL
         SELECT UUID(),
                'TypeScript',
                'Typed JS',
                1,
                'Languages & Frameworks',
                'Trial',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Rust',
                'Systems language',
                1,
                'Languages & Frameworks',
                'Assess',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Java',
                'OOP language',
                1,
                'Languages & Frameworks',
                'Adopt',
                NOW(6),
                NOW(6),
                NOW()
         UNION ALL
         SELECT UUID(),
                'Perl',
                'Older scripting language',
                1,
                'Languages & Frameworks',
                'Hold',
                NOW(6),
                NOW(6),
                NOW()) AS seed
WHERE NOT EXISTS (SELECT 1 FROM technology LIMIT 1);

INSERT INTO user (id, username, password, roles)
SELECT *
FROM (SELECT UUID(), 'admin', '$2b$10$j6bMutdnr7kVDqArENeKT.px8ndqzRBrYhfhgDsEnTXEMAv8GbjT6', '["user", "admin"]'
      UNION ALL
      SELECT UUID(), 'user', '$2b$10$vW2AGWefXRyx2m8pWieDvuI7LAVcxGG6UXOkzISFbWY4KBe7vsIki', '["user"]'
WHERE NOT EXISTS (SELECT 1 FROM user LIMIT 1);
