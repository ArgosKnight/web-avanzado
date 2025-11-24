import Post from "../models/post.js";

class PostRepository {
    async create(data) {
        const post = new Post(data);
        return await post.save();
    }

    async findAll() {
        return await Post.find().populate("user");
    }

    async findById(id) {
        return await Post.findById(id);
    }

    async update(id, data) {
        return await Post.findByIdAndUpdate(
            id,
            { ...data, updatedAt: new Date() },
            { new: true }
        );
    }

    async delete(id) {
        return await Post.findByIdAndDelete(id);
    }
}

export default new PostRepository();
