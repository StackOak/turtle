interface ConfigResponse {
    msg: string
    code: number
    data: {
        law_config: {
            icp_link: string
            copyright: string
            icp_number: string
            police_record: string
            police_record_link: string
        }
        seo_config: {
            logo: string
            blog_name: string
            site_title: string
            site_favicon: string
            site_keywords: string
            site_description: string
        }
    }
}

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
        social:{
            gitee:'',
            github:''
        }
    }))
}
