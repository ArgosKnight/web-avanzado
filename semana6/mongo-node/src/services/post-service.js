import postRepository from "../repositories/post-repository.js";
import userRepository from "../repositories/user-repository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        return await postRepository.create({
            ...postData,
            user: user._id
        });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPost(id) {
        return await postRepository.findById(id);
    }

    async updatePost(id, data) {
        return await postRepository.update(id, data);
    }

    async deletePost(id) {
        return await postRepository.delete(id);
    }
}

export default new PostService();
