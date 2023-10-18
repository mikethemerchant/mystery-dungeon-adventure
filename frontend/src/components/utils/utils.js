export function calculateLevel(experience) {
    const baseLevel = 1;
    const experiencePerLevel = 100;
    const level = Math.floor(Math.sqrt(2 * experience / experiencePerLevel + 0.25) - 0.5) + baseLevel;
    return level;
}