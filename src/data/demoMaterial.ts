export const JAVA_THREAD_POOL_DEMO = `# Java 线程池

## ThreadPoolExecutor 参数

new ThreadPoolExecutor(
    16,
    64,
    60, TimeUnit.SECONDS,
    new LinkedBlockingQueue<>(200),
    new CustomRetryPolicy()
);

corePoolSize 是核心线程数，maximumPoolSize 是最大线程数。非核心线程空闲 60 秒后回收，工作队列容量为 200。生产环境应根据任务类型、并发量和下游耗时设置有界队列与可控线程数。

## 常见线程池

ScheduledThreadPool 支持定时或周期性执行任务。FixedThreadPool 的核心线程数和最大线程数相同，超出处理能力的任务进入队列等待。CachedThreadPool 使用 SynchronousQueue，线程空闲后可以回收，但线程数量可能快速增长。SingleThreadExecutor 只有一个工作线程，适合需要按提交顺序执行的任务。

## 使用建议

不建议直接使用 Executors 创建线程池，因为 FixedThreadPool 可能使用无界队列，CachedThreadPool 可能创建大量线程，极端情况下会导致内存或线程资源耗尽。应手动创建 ThreadPoolExecutor，设置有意义的线程名，并监控活跃线程数、队列积压和拒绝次数。`

export const JAVA_THREAD_POOL_DEMO_NAME = 'java-thread-pool-demo.md'
