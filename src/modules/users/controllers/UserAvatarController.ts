import { Request, Response } from 'express';
import UploadUserAvatarService from '../services/UploadUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UploadUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file!.filename
    });

    return response.json(user)
  }
}
