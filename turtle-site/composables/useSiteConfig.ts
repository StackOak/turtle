export const useSiteConfig = () => {
    return useState('siteConfig', () => ({
        law: {
            icp_link: '',
            copyright: '',
            icp_number: '',
            police_record: '',
            police_record_link: ''
        },
        seo: {
            logo: '',
            blog_name: '',
            site_title: '',
            site_favicon: '',
            site_keywords: '',
            site_description: ''
        },
        social: {
            gitee: '',
            github: ''
        }
    }))
}
