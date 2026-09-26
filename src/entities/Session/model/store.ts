import type {Credentials} from "@/entities/Session/model/types";
import {create} from "zustand";
import {devtools, persist} from 'zustand/middleware';
import {GreenApi} from "@/shared/api/greenApi/greenApi";

interface SessionState {
    credentials: Credentials | null;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
    login: (idInstance: string, apiTokenInstance: string) => Promise<boolean>;
}

export const useSessionStore = create<SessionState>()(
    devtools(
        persist(
            (set) => ({
                credentials: null,
                isLoading: false,
                error: null,

                logout: () => set({ credentials: null, error: null }, false, 'session/logout'),
                login: async (idInstance: string, apiTokenInstance: string) => {
                    set({isLoading: true, error: null}, false, 'session/loginStart');
                    try {
                        const greenApi = new GreenApi({idInstance, apiTokenInstance})
                        await greenApi.getStateInstance()

                        set({
                            credentials: {
                                idInstance,
                                apiTokenInstance
                            },
                            isLoading: false,
                        }, false, 'session/loginSuccess')

                        return true;
                    } catch (err) {
                        set({
                            error: 'Неверный ID или Api Instances',
                            isLoading: false
                        }, false, 'session/loginError')
                        return false;
                    }
                }
            }),
            {
                name: 'green-api-session',
                partialize: (state) => ({ credentials: state.credentials }),
            }
        ),
        { name: 'Session' }
    )
);