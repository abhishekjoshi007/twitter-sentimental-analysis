export enum EmotionEnum {
    Sadness = 'sadness',
    Worry = 'worry',
    Love = 'love',
    Happiness = 'happiness',
    Hate = 'hate'
}
export const EMOTION_OPTIONS = [
    EmotionEnum.Sadness,
    EmotionEnum.Worry,
    EmotionEnum.Love,
    EmotionEnum.Happiness,
    EmotionEnum.Hate
]
export type TEmotion = EmotionEnum.Sadness |
    EmotionEnum.Worry |
    EmotionEnum.Love |
    EmotionEnum.Happiness |
    EmotionEnum.Hate