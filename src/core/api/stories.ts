import { Request } from "../request";
import { StoryDto } from "../../dtos/StoryDto";

export const StoriesAPI = {
    createStory: (dto: StoryDto) => {
        return Request.post(`/stories`, dto);
    },
    getStories: () => {
        return Request.get(`/stories`);
    },
    getStory: (storyId: string) => {
        return Request.get(`/stories/${storyId}`);
    },
    updateStory: (storyId: string, dto: StoryDto) => {
        return Request.put(`/stories/${storyId}`, dto);
    },
};
