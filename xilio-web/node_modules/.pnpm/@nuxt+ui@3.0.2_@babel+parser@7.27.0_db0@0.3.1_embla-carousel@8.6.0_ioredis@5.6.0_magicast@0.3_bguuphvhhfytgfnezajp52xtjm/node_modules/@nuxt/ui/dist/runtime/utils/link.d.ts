import type { LinkProps } from '../types';
export declare function pickLinkProps(link: LinkProps & {
    [key: string]: any;
}): {
    [x: string]: any;
};
