import { ref, onMounted, onUnmounted } from 'vue';

export function useInfiniteScroll(options: {
    loadMore: () => void; // 加载更多数据的函数
    loading: Ref<boolean>; // 是否正在加载的状态
    hasMore: Ref<boolean>; // 是否还有更多数据的状态
    maxLoadedPage: Ref<number>; // 已加载的最大页面
    currentPage: Ref<number>; // 当前页面
}) {
    const { loadMore, loading, hasMore, maxLoadedPage, currentPage } = options;

    const lastScrollTop = ref(0);

    // 防抖函数
    const debounce = (fn: Function, delay: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    };

    // 处理滚动事件
    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isScrollingDown = scrollTop > lastScrollTop.value;
        lastScrollTop.value = scrollTop;

        if (
            isScrollingDown &&
            scrollTop + windowHeight >= documentHeight - 100 &&
            !loading.value &&
            hasMore.value &&
            currentPage.value > maxLoadedPage.value
        ) {
            loadMore();
        }
    };

    // 事件监听，原逻辑不变
    onMounted(() => {
        window.addEventListener('scroll', debounce(handleScroll, 200));
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', debounce(handleScroll, 200));
    });

    return {
        lastScrollTop, // 返回 lastScrollTop 以便外部访问（如果需要）
    };
}
