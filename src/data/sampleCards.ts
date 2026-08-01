import type { AppCard } from '../domain/types'

export const JAVA_DECK_ID = 'java-basics-sample'
export const USER_DECK_ID = 'user-materials'

const sampleCardContent: Omit<AppCard, 'order' | 'importance' | 'score' | 'sourceRef'>[] = [
  {
    id: 'java-hashmap-thread-safety', deckId: JAVA_DECK_ID, topic: '集合',
    question: 'HashMap 为什么线程不安全？',
    coreAnswer: 'HashMap 的读写没有提供并发同步保证，多线程同时扩容或修改时可能发生数据覆盖、链表/树结构异常以及读取到不一致结果。',
    explanation: 'HashMap 的容量变化需要重新分配并迁移桶中的节点。多个线程同时写入时，修改过程相互覆盖，结构调整也可能被另一个线程打断。因此并发场景应使用 ConcurrentHashMap 或在外部进行同步。',
    keyPoints: ['读写没有并发保证', '扩容迁移可能互相覆盖', '并发场景优先考虑 ConcurrentHashMap'],
    followUps: ['ConcurrentHashMap 如何降低锁竞争？'], tags: ['HashMap', '并发'], source: 'builtin'
  },
  {
    id: 'java-concurrent-hashmap', deckId: JAVA_DECK_ID, topic: '并发',
    question: 'ConcurrentHashMap 如何保证并发安全？',
    coreAnswer: 'JDK 8 中主要通过 CAS 和 synchronized 锁住单个桶或节点，读操作通常不加锁，从而在保证安全的同时降低锁粒度。',
    explanation: '它使用 volatile 保证可见性，CAS 完成部分无锁更新，发生冲突时才对桶的首节点加 synchronized。扩容时多个线程也可以协助迁移。',
    keyPoints: ['CAS', '桶级 synchronized', '读操作弱锁化', '支持协作扩容'],
    followUps: ['ConcurrentHashMap 的 size 为什么不是简单累加？'], tags: ['ConcurrentHashMap'], source: 'builtin'
  },
  {
    id: 'java-arraylist-linkedlist', deckId: JAVA_DECK_ID, topic: '集合',
    question: 'ArrayList 和 LinkedList 有什么区别？',
    coreAnswer: 'ArrayList 基于动态数组，随机访问快、尾部追加通常快；LinkedList 基于双向链表，已定位节点后的插入删除快，但随机访问慢。',
    explanation: '实际工程中 ArrayList 通常是默认选择，因为连续内存带来更好的缓存局部性。LinkedList 只有在频繁进行节点级插入删除且能直接拿到节点位置时才有优势。',
    keyPoints: ['底层结构不同', '随机访问 ArrayList 更快', 'LinkedList 不等于插入删除总是更快'],
    followUps: ['为什么 ArrayList 扩容会影响性能？'], tags: ['ArrayList', 'LinkedList'], source: 'builtin'
  },
  {
    id: 'java-string-immutable', deckId: JAVA_DECK_ID, topic: '基础',
    question: 'String 为什么不可变？',
    coreAnswer: 'String 内部值创建后不能改变，不可变性带来了字符串常量池复用、线程安全、哈希值缓存和安全性等好处。',
    explanation: '字符串修改操作会返回新的 String 对象。不可变对象可以安全地作为 HashMap 的 key，也能避免类加载、文件路径等场景中的内容被偷偷修改。',
    keyPoints: ['值不可修改', '可安全共享', 'hashCode 可以缓存', '修改会创建新对象'],
    followUps: ['String、StringBuilder 和 StringBuffer 如何选择？'], tags: ['String'], source: 'builtin'
  },
  {
    id: 'java-equals-double-equals', deckId: JAVA_DECK_ID, topic: '基础',
    question: '== 和 equals() 有什么区别？',
    coreAnswer: '比较基本类型时 == 比较值；比较引用类型时 == 比较是否为同一对象，equals() 用于比较对象逻辑上的相等性，但具体规则由类实现决定。',
    explanation: 'Object.equals 默认仍然比较引用。重写 equals 的类通常也必须重写 hashCode，否则放入 HashMap、HashSet 后会违反相等对象必须有相同哈希值的约定。',
    keyPoints: ['基本类型比较值', '引用类型 == 比较身份', '重写 equals 必须关注 hashCode'],
    followUps: ['为什么重写 equals 必须同时重写 hashCode？'], tags: ['Object', 'equals'], source: 'builtin'
  },
  {
    id: 'java-jvm-memory', deckId: JAVA_DECK_ID, topic: 'JVM',
    question: 'JVM 运行时内存区域有哪些？',
    coreAnswer: '主要包括程序计数器、Java 虚拟机栈、本地方法栈、堆和方法区；其中堆和方法区是线程共享区域。',
    explanation: '程序计数器、虚拟机栈和本地方法栈通常随线程创建。堆存放对象实例，是垃圾回收的重点区域。方法区存放类元数据、常量等信息，具体实现随 JDK 版本变化。',
    keyPoints: ['线程私有与共享区域', '堆存放对象', '栈帧保存方法调用状态'],
    followUps: ['哪些区域可能发生 OutOfMemoryError？'], tags: ['JVM', '内存'], source: 'builtin'
  },
  {
    id: 'java-class-loading', deckId: JAVA_DECK_ID, topic: 'JVM',
    question: 'Java 类加载过程是什么？',
    coreAnswer: '典型过程包括加载、验证、准备、解析和初始化，前五步通常统称为连接阶段。',
    explanation: '加载负责把类的二进制数据变成方法区中的运行时数据结构。验证保证字节码安全，准备分配并设置静态变量初始值，解析将符号引用转为直接引用，初始化执行类初始化代码。',
    keyPoints: ['加载', '验证', '准备', '解析', '初始化'],
    followUps: ['双亲委派模型解决了什么问题？'], tags: ['类加载', 'JVM'], source: 'builtin'
  },
  {
    id: 'java-synchronized-lock', deckId: JAVA_DECK_ID, topic: '并发',
    question: 'synchronized 和 ReentrantLock 有什么区别？',
    coreAnswer: 'synchronized 是语言级关键字，使用简单并由 JVM 管理；ReentrantLock 是 API，提供可中断获取锁、公平锁、超时尝试和多个条件队列等能力。',
    explanation: '两者都支持可重入。使用 ReentrantLock 时必须在 finally 中释放锁，否则异常会造成锁泄漏。没有额外需求时 synchronized 通常更简单。',
    keyPoints: ['都支持可重入', 'Lock 能力更丰富', 'Lock 必须显式释放'],
    followUps: ['什么是可重入锁？'], tags: ['锁', '并发'], source: 'builtin'
  },
  {
    id: 'java-thread-pool', deckId: JAVA_DECK_ID, topic: '并发',
    question: '什么是线程池？为什么要使用线程池？',
    coreAnswer: '线程池预先或按需管理一组工作线程，复用线程来执行任务，减少频繁创建销毁线程的成本，并统一控制并发数量。',
    explanation: '线程池通常包含核心线程数、最大线程数、任务队列、存活时间和拒绝策略。参数需要结合任务类型、CPU 数量和外部依赖设置，不能盲目使用无界队列。',
    keyPoints: ['复用线程', '控制并发', '任务队列承载突发流量', '拒绝策略处理过载'],
    followUps: ['线程池任务提交后的执行顺序是什么？'], tags: ['线程池'], source: 'builtin'
  },
  {
    id: 'java-spring-bean-lifecycle', deckId: JAVA_DECK_ID, topic: 'Spring',
    question: 'Spring Bean 的生命周期是什么？',
    coreAnswer: '大致经历实例化、属性填充、Aware 回调、前置处理、初始化方法、后置处理并最终放入容器；容器关闭时执行销毁方法。',
    explanation: 'BeanPostProcessor 会在初始化前后参与处理，也是很多 Spring 能力的扩展点。具体流程会受作用域、是否实现接口和配置方式影响。',
    keyPoints: ['实例化与属性填充', '初始化前后处理器', '销毁回调'],
    followUps: ['BeanPostProcessor 什么时候执行？'], tags: ['Spring', 'Bean'], source: 'builtin'
  }
]

export const sampleCards: AppCard[] = sampleCardContent.map((card, index) => ({
  ...card,
  order: index + 1,
  importance: 'S',
  score: 8,
  sourceRef: '旧版示例内容'
}))
