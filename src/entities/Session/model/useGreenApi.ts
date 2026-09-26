import {useSessionStore} from "@/entities/Session";
import {GreenApi} from "@/shared/api/greenApi/greenApi";

export const useGreenApi = () => {
    const credentials = useSessionStore((state) => state.credentials)

    if(!credentials) return null

    return new GreenApi(credentials)
}