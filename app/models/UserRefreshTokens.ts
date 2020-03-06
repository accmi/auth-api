import { STRING, UUID, Model, UUIDV1 } from 'sequelize';
import { db } from '../database/config';

export class UserRefreshTokens extends Model { }

UserRefreshTokens.init({
    id: {
        type: UUID,
        defaultValue: UUIDV1,
        primaryKey: true
    },
    token: {
        type: STRING,
    },
    login: {
        type: STRING,
    },
}, {
    sequelize: db,
    modelName: 'User',
    freezeTableName: true,
});
