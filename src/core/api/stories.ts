import { Request } from "../request";
import { StoryDto } from "../../dtos/StoryDto";
import { ISubstory } from "../../types/ISubstory";

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
    updateSubstory: (substoryId: string, dto: ISubstory) => {
        return Request.put(`/stories/substory/${substoryId}`, dto);
    },
    attachSubstory: (storyId: string, substory: ISubstory, blockId?: string) => {
        return Request.put(
            `/stories/${storyId}/substory${blockId ? `?substoryBlock=${blockId}` : ""}`,
            substory
        );
    },
};
