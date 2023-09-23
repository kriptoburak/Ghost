import React, {createContext, useContext} from 'react';
import useSearchService, {SearchService} from '../../utils/search';
import {DefaultHeaderTypes} from '../../utils/unsplash/UnsplashTypes';
import {ZapierTemplate} from '../settings/advanced/integrations/ZapierModal';
import type * as Sentry from '@sentry/browser';

export type OfficialTheme = {
    name: string;
    category: string;
    previewUrl: string;
    ref: string;
    image: string;
    url?: string;
};

interface ServicesContextProps {
    ghostVersion: string
    officialThemes: OfficialTheme[];
    zapierTemplates: ZapierTemplate[];
    search: SearchService;
    unsplashConfig: DefaultHeaderTypes;
    toggleFeatureFlag: (flag: string, enabled: boolean) => void;
    sentry?: typeof Sentry;
}

interface ServicesProviderProps {
    children: React.ReactNode;
    ghostVersion: string;
    zapierTemplates: ZapierTemplate[];
    officialThemes: OfficialTheme[];
    toggleFeatureFlag: (flag: string, enabled: boolean) => void;
    unsplashConfig: DefaultHeaderTypes;
    sentry?: typeof Sentry;
}

const ServicesContext = createContext<ServicesContextProps>({
    ghostVersion: '',
    officialThemes: [],
    zapierTemplates: [],
    search: {filter: '', setFilter: () => {}, checkVisible: () => true},
    toggleFeatureFlag: () => {},
    unsplashConfig: {
        Authorization: '',
        'Accept-Version': '',
        'Content-Type': '',
        'App-Pragma': '',
        'X-Unsplash-Cache': true
    },
    sentry: undefined
});

const ServicesProvider: React.FC<ServicesProviderProps> = ({children, ghostVersion, zapierTemplates, officialThemes, toggleFeatureFlag, unsplashConfig, sentry}) => {
    const search = useSearchService();

    return (
        <ServicesContext.Provider value={{
            ghostVersion,
            officialThemes,
            zapierTemplates,
            search,
            unsplashConfig,
            toggleFeatureFlag,
            sentry
        }}>
            {children}
        </ServicesContext.Provider>
    );
};

export {ServicesContext, ServicesProvider};

export const useServices = () => useContext(ServicesContext);

export const useOfficialThemes = () => useServices().officialThemes;

export const useSearch = () => useServices().search;

export const useSentry = () => useServices().sentry;
