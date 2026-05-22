export default function useImageModal() {
    const currentImage = useState<string|null>('image-modal', () => null)

    const setImage = (image: string | null) => {
        currentImage.value = image
    }

    return {
        setImage,
        currentImage,
    }
}