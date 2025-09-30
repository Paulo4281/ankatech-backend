INSERT INTO tb_family
    (id_family, name_family)
VALUES
    ('86ca4305-e9a2-47a8-8d4c-d0d2c17dc112', 'Família Nobile')
ON CONFLICT (id_family) DO NOTHING;

INSERT INTO tb_familymember
    (id_familymember, name_familymember, id_family)
VALUES
    ('0d6b4e33-5a69-4643-be09-3e296e6c07fc', 'Anderson Nobile', '86ca4305-e9a2-47a8-8d4c-d0d2c17dc112'),
    ('9e5dd256-e9f8-4dad-9cf2-bc80e6eb6777', 'Zipora Nobile', '86ca4305-e9a2-47a8-8d4c-d0d2c17dc112')
ON CONFLICT (id_familymember) DO NOTHING;