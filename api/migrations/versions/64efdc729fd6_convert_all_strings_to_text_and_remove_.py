"""Convert all strings to text and remove salt

Revision ID: 64efdc729fd6
Revises: 
Create Date: 2025-06-06 00:27:59.923034

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '64efdc729fd6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column('preview_picture',
               existing_type=sa.TEXT(),
               nullable=True)

    with op.batch_alter_table('cleanwalks', schema=None) as batch_op:
        batch_op.alter_column('pos_lat',
               existing_type=sa.REAL(),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('pos_long',
               existing_type=sa.REAL(),
               type_=sa.Float(),
               existing_nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               nullable=False)
        batch_op.drop_index(batch_op.f('cleanwalks_city_id'))

    with op.batch_alter_table('organizations', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('organisations_user_id'))

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
        batch_op.drop_constraint(batch_op.f('users_email'), type_='unique')
        batch_op.drop_index(batch_op.f('users_role_id'))
        batch_op.create_index(batch_op.f('ix_users_email'), ['email'], unique=True)
        batch_op.drop_column('salt')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('salt', postgresql.BYTEA(), autoincrement=False, nullable=True))
        batch_op.drop_index(batch_op.f('ix_users_email'))
        batch_op.create_index(batch_op.f('users_role_id'), ['role_id'], unique=False)
        batch_op.create_unique_constraint(batch_op.f('users_email'), ['email'], postgresql_nulls_not_distinct=False)
        batch_op.alter_column('created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)

    with op.batch_alter_table('organizations', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('organisations_user_id'), ['user_id'], unique=False)

    with op.batch_alter_table('cleanwalks', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('cleanwalks_city_id'), ['city_id'], unique=False)
        batch_op.alter_column('description',
               existing_type=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('pos_long',
               existing_type=sa.Float(),
               type_=sa.REAL(),
               existing_nullable=False)
        batch_op.alter_column('pos_lat',
               existing_type=sa.Float(),
               type_=sa.REAL(),
               existing_nullable=False)

    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column('preview_picture',
               existing_type=sa.TEXT(),
               nullable=False)

    # ### end Alembic commands ###
