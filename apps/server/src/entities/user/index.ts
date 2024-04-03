import { applyOnlyMethodsMixins } from '../../shared/utils';
import { UserMutationEntity } from './mutation';
import { UserQueryEntity } from './query';

interface UserEntity extends UserQueryEntity, UserMutationEntity {}

class UserEntity {}
applyOnlyMethodsMixins(UserEntity, [UserQueryEntity, UserMutationEntity]);

export const userEntity = new UserEntity();
