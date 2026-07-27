import type { AppCard } from '../domain/types'

export const javaCards: AppCard[] = [
  {
    "id": "java-base-60a8a6943d",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 9,
    "question": "如何理解基本类型、数值转换与 BigDecimal？",
    "coreAnswer": "Java支持数据类型分为两类： 基本数据类型和引用数据类型。 基本数据类型共有8种，可以分为三类： 数值型：整数类型（byte、short、int、long）和浮点类型（ﬂoat、double） 字符型：char 布尔型：boolean 8种基本数据类型的默认值、位数、取值范围，如下表所示： 数据类型 占用大小 （字节） 位 数 取值范围 默认值 描述 byte 1 8 -128（-2^7） 到 127（2^7 - 1） 0 short 2 16 -32768（-2^15） 到 32767（2^15 - 1） int 4 32 -2147483648（-2^31） 到 2147483647（2^31 - 1） 0 0 long 8…",
    "explanation": "八种基本的数据类型：Java支持数据类型分为两类： 基本数据类型和引用数据类型。 基本数据类型共有8种，可以分为三类： 数值型：整数类型（byte、short、int、long）和浮点类型（ﬂoat、double） 字符型：char 布尔型：boolean 8种基本数据类型的默认值、位数、取值范围，如下表所示： 数据类型 占用大小 （字节） 位 数 取值范围 默认值 描述 byte 1 8 -128（-2^7） 到 127（2^7 - 1） 0 short 2 16 -32768（-2^15） 到 32767（2^15 - 1） int 4 32 -2147483648（-2^31） 到 2147483647（2^31 - 1） 0 0 long 8 64 -9223372036854775808（-2^63） 到 9223372036854775807（2^63 - 1） 0L float 4 32 1.4E - 45 到 3.4028235E3… long和int可以互转吗 ？：可以的，Java中的 long 和 int 可以相互转换。由于 long 类型的范围比 int 类型大，因此将 int 转换为 long 是 安全的，而将 long 转换为 int 可能会导致数据丢失或溢出。 将 int 转换为 long 可以通过直接赋值或强制类型转换来实现。例如： int intValue = 10; long longValue = intValue; // 自动转换，安全的 将 long 转换为 int 需要使用强制类型转换，但需要注意潜在的数据丢失或溢出问题。 例如： long longValue = 100L; int intValue = (int) longValue; // 强制类型转换，可能会有数据丢失或溢出 在将 long 转换为 int 时，如果 longValue 的值超出了 int 类型的范围，转换结果将是截断后的低位部分。… 类型互转会出现什么问题吗？：基本数据类型转换的问题 当把小范围数据类型赋值给大范围数据类型时，Java 会自动进行类型转换，这种转换一般是安全的。 int num = 100; long bigNum = num; // 自动将int转换为long 但是大范围数据类型赋值给小范围数据类型时，会发生数据数据溢出或者精度损失的问题。…",
    "keyPoints": [
      "说出 8 种基本类型及常见位数",
      "自动提升、强转的溢出/精度风险",
      "金额为何用 BigDecimal 及字符串构造"
    ],
    "followUps": [
      "long和int可以互转吗 ？",
      "类型互转会出现什么问题吗？"
    ],
    "tags": [
      "Java基础",
      "基本类型",
      "数值转换与 BigDecimal",
      "BigDecimal",
      "基本类型、数值转换与 BigDecimal"
    ],
    "sourceRef": "Java基础 PDF p.5-9：八种基本类型；int/long；类型互转；BigDecimal 与 double",
    "source": "builtin",
    "order": 1
  },
  {
    "id": "java-base-41e37f5ab3",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 8,
    "question": "如何理解装箱拆箱、Integer 与缓存？",
    "coreAnswer": "装箱（Boxing）和拆箱（Unboxing）是将基本数据类型和对应的包装类之间进行转换的过程。 Integer i = 10; //装箱 int n = i; //拆箱 自动装箱主要发生在两种情况，一种是赋值时，另一种是在方法调用的时候。 赋值时 这是最常见的一种情况，在Java 1.5以前我们需要手动地进行转换才行，而现在所有的转换都是由编译器来完成。…",
    "explanation": "装箱和拆箱是什么？：装箱（Boxing）和拆箱（Unboxing）是将基本数据类型和对应的包装类之间进行转换的过程。 Integer i = 10; //装箱 int n = i; //拆箱 自动装箱主要发生在两种情况，一种是赋值时，另一种是在方法调用的时候。 赋值时 这是最常见的一种情况，在Java 1.5以前我们需要手动地进行转换才行，而现在所有的转换都是由编译器来完成。… Java为什么要有Integer？：Integer对应是int类型的包装类，就是把int类型包装成Object对象，对象封装有很多好处，可以把属性也就是数据 跟处理这些数据的方法结合在一起，比如Integer就有parseInt()等方法来专门处理int型相关的数据。 另一个非常重要的原因就是在Java中绝大部分方法或类都是用来处理类类型对象的，如ArrayList集合类就只能以类 作为他的存储对象，而这时如果想把一个int型的数据存入list是不可能的，必须把它包装成类，也就是Integer才能 被List所接受。所以Integer的存在是很必要的。 泛型中的应用 在Java中，泛型只能使用引用类型，而不能使用基本类型。因此，如果要在泛型中使用int类型，必须使用Integer 包装类。例如，假设我们有一个列表，我们想要将其元素排序，并将排序结果存储在一个新的列表中。如果我们使 用基本数据类型int，无法直接使用Collections.sort()方法。… 说一下 integer的缓存：Java的Integer类内部实现了一个静态缓存池，用于存储特定范围内的整数值对应的Integer对象。 默认情况下，这个范围是-128至127。当通过Integer.valueOf(int)方法创建一个在这个范围内的整数对象时，并不 会每次都生成新的对象实例，而是复用缓存中的现有对象，会直接从内存中取出，不需要新建一个对象。",
    "keyPoints": [
      "自动装箱拆箱的本质",
      " int 与 Integer 的默认值、泛型适用和性能",
      " Integer 缓存区间及 == 陷阱"
    ],
    "followUps": [
      "Java为什么要有Integer？",
      "说一下 integer的缓存？"
    ],
    "tags": [
      "Java基础",
      "装箱拆箱",
      "Integer 与缓存",
      "Integer",
      "装箱拆箱、Integer 与缓存"
    ],
    "sourceRef": "Java基础 PDF p.10-13：装箱拆箱；为什么有 Integer；Integer 缓存",
    "source": "builtin",
    "order": 2
  },
  {
    "id": "java-base-5770f4b0fd",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 9,
    "question": "如何理解面向对象三大特性与多态？",
    "coreAnswer": "面向对象是一种编程范式，它将现实世界中的事物抽象为对象，对象具有属性（称为字段或属性）和行为（称为方 法）。面向对象编程的设计思想是以对象为中心，通过对象之间的交互来完成程序的功能，具有灵活性和可扩展 性，通过封装和继承可以更好地应对需求变化。 Java面向对象的三大特性包括：封装、继承、多态： 封装：封装是指将对象的属性（数据）和行为（方法）结合在一起，对外隐藏对象的内部细节，仅通过对象 提供的接口与外界交互。封装的目的是增强安全性和简化编程，使得对象更加独立。 继承：继承是一种可以使得子类自动共享父类数据结构和方法的机制。它是代码复用的重要手段，通过继承 可以建立类与类之间的层次关系，使得结构更加清晰。…",
    "explanation": "怎么理解面向对象？简单说说封装继承多态：面向对象是一种编程范式，它将现实世界中的事物抽象为对象，对象具有属性（称为字段或属性）和行为（称为方 法）。面向对象编程的设计思想是以对象为中心，通过对象之间的交互来完成程序的功能，具有灵活性和可扩展 性，通过封装和继承可以更好地应对需求变化。 Java面向对象的三大特性包括：封装、继承、多态： 封装：封装是指将对象的属性（数据）和行为（方法）结合在一起，对外隐藏对象的内部细节，仅通过对象 提供的接口与外界交互。封装的目的是增强安全性和简化编程，使得对象更加独立。 继承：继承是一种可以使得子类自动共享父类数据结构和方法的机制。它是代码复用的重要手段，通过继承 可以建立类与类之间的层次关系，使得结构更加清晰。 多态：多态是指允许不同类的对象对同一消息作出响应。即同一个接口，使用不同的实例而执行不同操作。 多态性可以分为编译时多态（重载）和运行时多态（重写）。它使得程序具有良好的灵活性和扩展性。 多态体现在哪几个方面？：多态在面向对象编程中可以体现在以下几个方面： 方法重载： 方法重载是指同一类中可以有多个同名方法，它们具有不同的参数列表（参数类型、数量或顺序不 同）。虽然方法名相同，但根据传入的参数不同，编译器会在编译时确定调用哪个方法。 示例：对于一个 add 方法，可以定义为 add(int a, int b) 和 add(double a, double b) 。 方法重写： 方法重写是指子类能够提供对父类中同名方法的具体实现。在运行时，JVM会根据对象的实际类型确定 调用哪个版本的方法。这是实现多态的主要方式。 示例：在一个动物类中，定义一个 sound 方法，子类 Dog 可以重写该方法以实现 bark ，而 Cat 可 以实现 meow 。 接口与实现： 多态也体现在接口的使用上，多个类可以实现同一个接口，并且用接口类型的引用来调用这些类的方 法。这使得程序在面对不同具体实现时保持一贯的调用方式。… 多态解决了什么问题？：多态是指子类可以替换父类，在实际的代码运行过程中，调用子类的方法实现。多态这种特性也需要编程语言提供 特殊的语法机制来实现，比如继承、接口类。 多态可以提高代码的扩展性和复用性，是很多设计模式、设计原则、编程技巧的代码实现基础。比如策略模式、基 于接口而非实现编程、依赖倒置原则、里式替换原则、利用多态去掉冗长的 if-else 语句等等",
    "keyPoints": [
      "能用一个业务例子讲封装、继承、多态",
      "编译期和运行期多态",
      "向上转型、动态绑定及多态解决的扩展问题"
    ],
    "followUps": [
      "多态体现在哪几个方面？",
      "多态解决了什么问题？"
    ],
    "tags": [
      "Java基础",
      "面向对象三大特性",
      "多态",
      "面向对象三大特性与多态"
    ],
    "sourceRef": "Java基础 PDF p.13-14：封装继承多态；多态体现；多态解决什么问题",
    "source": "builtin",
    "order": 3
  },
  {
    "id": "java-base-fc695d1d8b",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 9,
    "question": "Java 异常体系与处理语义应该如何理解？",
    "coreAnswer": "Java异常类层次结构图： Java的异常体系主要基于两大类：Throwable类及其子类。Throwable有两个重要的子类：Error和Exception，它 们分别代表了不同类型的异常情况。 1. Error（错误）：表示运行时环境的错误。错误是程序无法处理的严重问题，如系统崩溃、虚拟机错误、动态 链接失败等。通常，程序不应该尝试捕获这类错误。例如，OutOfMemoryError、StackOverﬂowError等。 2. Exception（异常）：表示程序本身可以处理的异常条件。异常分为两大类： 非运行时异常：这类异常在编译时期就必须被捕获或者声明抛出。…",
    "explanation": "介绍一下Java异常：Java异常类层次结构图： Java的异常体系主要基于两大类：Throwable类及其子类。Throwable有两个重要的子类：Error和Exception，它 们分别代表了不同类型的异常情况。 1. Error（错误）：表示运行时环境的错误。错误是程序无法处理的严重问题，如系统崩溃、虚拟机错误、动态 链接失败等。通常，程序不应该尝试捕获这类错误。例如，OutOfMemoryError、StackOverﬂowError等。 2. Exception（异常）：表示程序本身可以处理的异常条件。异常分为两大类： 非运行时异常：这类异常在编译时期就必须被捕获或者声明抛出。它们通常是外部错误，如文件不存在 （FileNotFoundException）、类未找到（ClassNotFoundException）等。非运行时异常强制程序员处 理这些可能出现的问题，增强了程序的健壮性。… Java异常处理有哪些？：异常处理是通过使用try-catch语句块来捕获和处理异常。以下是Java中常用的异常处理方式： try-catch语句块：用于捕获并处理可能抛出的异常。try块中包含可能抛出异常的代码，catch块用于捕获并处 理特定类型的异常。可以有多个catch块来处理不同类型的异常。 try { // 可能抛出异常的代码 } catch (ExceptionType1 e1) { // 处理异常类型1的逻辑 } catch (ExceptionType2 e2) { // 处理异常类型2的逻辑 } catch (ExceptionType3 e3) { // 处理异常类型3的逻辑 } finally { // 可选的finally块，用于定义无论是否发生异常都会执行的代码 } throw语句：用于手动抛出异常。可以根据需要在代码中使用throw语句主动抛出特定类型的异常。… 抛出异常为什么不用throws？：如果异常是未检查异常或者在方法内部被捕获和处理了，那么就不需要使用throws。 Unchecked Exceptions：未检查异常（unchecked exceptions）是继承自RuntimeException类或Error类 的异常，编译器不强制要求进行异常处理。因此，对于这些异常，不需要在方法签名中使用throws来声明。 示例包括NullPointerException、ArrayIndexOutOfBoundsException等。…",
    "keyPoints": [
      " Throwable、Error、Exception、RuntimeException 关系",
      "受检与非受检异常、throw 与 throws",
      " try/catch/finally 和 return 的执行顺序"
    ],
    "followUps": [
      "Java异常处理有哪些？",
      "抛出异常为什么不用throws？"
    ],
    "tags": [
      "Java基础",
      "Java 异常体系",
      "处理语义",
      "Java",
      "Java 异常体系与处理语义"
    ],
    "sourceRef": "Java基础 PDF p.30-33：Java 异常；异常处理；throw/throws；try-finally 返回",
    "source": "builtin",
    "order": 4
  },
  {
    "id": "java-equals-double-equals",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 10,
    "question": "== 和 equals() 有什么区别？",
    "coreAnswer": "对于字符串变量来说，使用\"==\"和\"equals\"比较字符串时，其比较方法不同。\"==\"比较两个变量本身的值，即两个 对象在内存中的首地址，\"equals\"比较字符串包含内容是否相同。 对于非字符串变量来说，如果没有对equals()进行重写的话，\"==\" 和 \"equals\"方法的作用是相同的，都是用来比较 对象在堆内存中的首地址，即用来比较两个引用变量是否指向同一个对象。 ==：比较的是两个字符串内存地址（堆内存）的数值是否相等，属于数值比较； equals()：比较的是两个字符串的内容，属于内容比较。…",
    "explanation": "== 与 equals 有什么区别？：对于字符串变量来说，使用\"==\"和\"equals\"比较字符串时，其比较方法不同。\"==\"比较两个变量本身的值，即两个 对象在内存中的首地址，\"equals\"比较字符串包含内容是否相同。 对于非字符串变量来说，如果没有对equals()进行重写的话，\"==\" 和 \"equals\"方法的作用是相同的，都是用来比较 对象在堆内存中的首地址，即用来比较两个引用变量是否指向同一个对象。 ==：比较的是两个字符串内存地址（堆内存）的数值是否相等，属于数值比较； equals()：比较的是两个字符串的内容，属于内容比较。 hashcode和equals方法有什么关系？：在 Java 中，对于重写 equals 方法的类，通常也需要重写 hashCode 方法，并且需要遵循以下规定： 一致性：如果两个对象使用 equals 方法比较结果为 true ，那么它们的 hashCode 值必须相同。也就是 说，如果 obj1.equals(obj2) 返回 true ，那么 obj1.hashCode() 必须等于 obj2.hashCode() 。 非一致性：如果两个对象的 hashCode 值相同，它们使用 equals 方法比较的结果不一定为 true 。即 obj1.hashCode() == obj2.hashCode() 时， obj1.equals(obj2) 可能为 false ，这种情况称为哈希冲突。…",
    "keyPoints": [
      "基本类型和值、引用地址与逻辑相等",
      "相等对象必须同 hash、同 hash 未必相等",
      "错误重写对 HashMap/HashSet 的影响"
    ],
    "followUps": [
      "hashcode和equals方法有什么关系？"
    ],
    "tags": [
      "Java基础",
      "==",
      "equals",
      "hashCode 契约",
      "hashCode",
      "==、equals 与 hashCode 契约"
    ],
    "sourceRef": "Java基础 PDF p.33：== 与 equals；hashCode 和 equals 的关系",
    "source": "builtin",
    "order": 5
  },
  {
    "id": "java-string-immutable",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "S",
    "score": 8,
    "question": "String、StringBuilder 和 StringBuffer 如何选择？",
    "coreAnswer": "1、可变性 ： String 是不可变的（Immutable），一旦创建，内容无法修改，每次修改都会生成一个新的对 象。 StringBuilder 和 StringBuffer 是可变的（Mutable），可以直接对字符串内容进行修改而不会创建新对 象。 2、线程安全性 ： String 因为不可变，天然线程安全。 StringBuilder 不是线程安全的，适用于单线程环境。 StringBuffer 是线程安全的，其方法通过 synchronized 关键字实现同步，适用于多线程环境。 3、性能 ： String 性能最低，尤其是在频繁修改字符串时会生成大量临时对象，增加内存开销和垃圾回收压力。…",
    "explanation": "String、StringBuﬀer、StringBuilder的区别和联系：1、可变性 ： String 是不可变的（Immutable），一旦创建，内容无法修改，每次修改都会生成一个新的对 象。 StringBuilder 和 StringBuffer 是可变的（Mutable），可以直接对字符串内容进行修改而不会创建新对 象。 2、线程安全性 ： String 因为不可变，天然线程安全。 StringBuilder 不是线程安全的，适用于单线程环境。 StringBuffer 是线程安全的，其方法通过 synchronized 关键字实现同步，适用于多线程环境。 3、性能 ： String 性能最低，尤其是在频繁修改字符串时会生成大量临时对象，增加内存开销和垃圾回收压力。 StringBuilder 性能最高，因为它没有线程安全的开销，适合单线程下的字符串操作。 StringBuffer 性能略低 于 StringBuilder ，因为它的线程安全机制引入了同步开销。…",
    "keyPoints": [
      " String 不可变及字符串池带来的影响",
      "三者的可变性、线程安全和使用场景",
      "能避免循环拼接产生大量临时对象"
    ],
    "followUps": [
      " String 不可变及字符串池带来的影响？",
      "三者的可变性、线程安全和使用场景？"
    ],
    "tags": [
      "Java基础",
      "String",
      "StringBuilder",
      "StringBuffer",
      "String、StringBuilder、StringBuffer"
    ],
    "sourceRef": "Java基础 PDF p.33-34：String、StringBuffer、StringBuilder 的区别和联系",
    "source": "builtin",
    "order": 6
  },
  {
    "id": "java-collections-5cee5b5c21",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "S",
    "score": 9,
    "question": "集合体系与 List/Set/Map 选型是什么？",
    "coreAnswer": "List是有序的Collection，使用此接口能够精确的控制每个元素的插入位置，用户能根据索引访问List中元素。常用 的实现List的类有LinkedList，ArrayList，Vector，Stack。 ArrayList是容量可变的非线程安全列表，其底层使用数组实现。当几何扩容时，会创建更大的数组，并把原 数组复制到新数组。ArrayList支持对元素的快速随机访问，但插入与删除速度很慢。 LinkedList本质是一个双向链表，与ArrayList相比，，其插入和删除速度更快，但随机访问速度更慢。 Set不允许存在重复的元素，与List不同，set中的元素是无序的。…",
    "explanation": "说说Java中的集合？：List是有序的Collection，使用此接口能够精确的控制每个元素的插入位置，用户能根据索引访问List中元素。常用 的实现List的类有LinkedList，ArrayList，Vector，Stack。 ArrayList是容量可变的非线程安全列表，其底层使用数组实现。当几何扩容时，会创建更大的数组，并把原 数组复制到新数组。ArrayList支持对元素的快速随机访问，但插入与删除速度很慢。 LinkedList本质是一个双向链表，与ArrayList相比，，其插入和删除速度更快，但随机访问速度更慢。 Set不允许存在重复的元素，与List不同，set中的元素是无序的。常用的实现有HashSet，LinkedHashSet和 TreeSet。 HashSet通过HashMap实现，HashMap的Key即HashSet存储的元素，所有Key都是用相同的Value，一个名 为PRESENT的Object类型常量。… Java中的线程安全的集合是什么？：在 java.util 包中的线程安全的类主要 2 个，其他都是非线程安全的。 Vector：线程安全的动态数组，其内部方法基本都经过synchronized修饰，如果不需要线程安全，并不建议 选择，毕竟同步是有额外开销的。Vector 内部是使用对象数组来保存数据，可以根据需要自动的增加容量， 当数组已满时，会创建新的数组，并拷贝原有数组数据。 Hashtable：线程安全的哈希表，HashTable 的加锁方法是给每个方法加上 synchronized 关键字，这样锁住 的是整个 Table 对象，不支持 null 键和值，由于同步导致的性能开销，所以已经很少被推荐使用，如果要保 证线程安全的哈希表，可以用ConcurrentHashMap。…",
    "keyPoints": [
      "说清 Collection 下 List、Set、Queue 与独立 Map 的关系",
      "有序、重复、键值映射语义",
      "能按查找、插入、排序、去重需求选实现"
    ],
    "followUps": [
      "Java中的线程安全的集合是什么？"
    ],
    "tags": [
      "Java集合",
      "集合体系与 List",
      "Set",
      "Map 选型",
      "List",
      "Map"
    ],
    "sourceRef": "Java集合 PDF p.1-4：Java 集合体系；线程安全集合概览",
    "source": "builtin",
    "order": 7
  },
  {
    "id": "java-arraylist-linkedlist",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "S",
    "score": 9,
    "question": "ArrayList 和 LinkedList 有什么区别？",
    "coreAnswer": "在Java中， List 接口是最常用的集合类型之一，用于存储元素的有序集合。以下是Java中常见的 List 实现及其特 点： Vector 是 Java 早期提供的线程安全的动态数组，如果不需要线程安全，并不建议选择，毕竟同步是有额外开 销的。Vector 内部是使用对象数组来保存数据，可以根据需要自动的增加容量，当数组已满时，会创建新的 数组，并拷贝原有数组数据。 ArrayList 是应用更加广泛的动态数组实现，它本身不是线程安全的，所以性能要好很多。与 Vector 近似， ArrayList适用于需要频繁访问集合元素的场景。…",
    "explanation": "讲一下java里面list的几种实现，几种实现有什么不同？：在Java中， List 接口是最常用的集合类型之一，用于存储元素的有序集合。以下是Java中常见的 List 实现及其特 点： Vector 是 Java 早期提供的线程安全的动态数组，如果不需要线程安全，并不建议选择，毕竟同步是有额外开 销的。Vector 内部是使用对象数组来保存数据，可以根据需要自动的增加容量，当数组已满时，会创建新的 数组，并拷贝原有数组数据。 ArrayList 是应用更加广泛的动态数组实现，它本身不是线程安全的，所以性能要好很多。与 Vector 近似， ArrayList 和 LinkedList 的应用场景？：ArrayList适用于需要频繁访问集合元素的场景。它基于数组实现，可以通过索引快速访问元素，因此在按索 引查找、遍历和随机访问元素的操作上具有较高的性能。当需要频繁访问和遍历集合元素，并且集合大小不 经常改变时，推荐使用ArrayList LinkedList适用于频繁进行插入和删除操作的场景。它基于链表实现，插入和删除元素的操作只需要调整节点 的指针，因此在插入和删除操作上具有较高的性能。当需要频繁进行插入和删除操作，或者集合大小经常改 变时，可以考虑使用LinkedList。",
    "keyPoints": [
      "动态数组与双向链表、随机访问、头尾/中间插删、内存局部性",
      "“LinkedList 插删一定快”缺少定位成本这一前提"
    ],
    "followUps": [
      "ArrayList 和 LinkedList 的应用场景？"
    ],
    "tags": [
      "Java集合",
      "ArrayList",
      "LinkedList 对比",
      "LinkedList",
      "ArrayList 与 LinkedList 对比"
    ],
    "sourceRef": "Java集合 PDF p.6-12：List 实现；ArrayList 与 LinkedList 区别及场景",
    "source": "builtin",
    "order": 8
  },
  {
    "id": "java-collections-e97596255e",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "S",
    "score": 10,
    "question": "HashMap 结构与 put/get 流程应该如何理解？",
    "coreAnswer": "在 JDK 1.7 版本之前， HashMap 数据结构是数组和链表，HashMap通过哈希算法将元素的键（Key）映射到数组 中的槽位（Bucket）。如果多个键映射到同一个槽位，它们会以链表的形式存储在同一个槽位上，因为链表的查询 时间是O(n)，所以冲突很严重，一个索引上的链表非常长，效率就很低了。…",
    "explanation": "HashMap实现原理介绍一下？：在 JDK 1.7 版本之前， HashMap 数据结构是数组和链表，HashMap通过哈希算法将元素的键（Key）映射到数组 中的槽位（Bucket）。如果多个键映射到同一个槽位，它们会以链表的形式存储在同一个槽位上，因为链表的查询 时间是O(n)，所以冲突很严重，一个索引上的链表非常长，效率就很低了。 所以在 JDK 1.8 版本的时候做了优化，当一个链表的长度超过8的时候就转换数据结构，不再使用链表存储，而是 hashmap的put过程介绍一下：HashMap HashMap的put()方法用于向HashMap中添加键值对，当调用HashMap的put()方法时，会按照以下详 细流程执行（JDK8 1.8版本）： 第一步：根据要添加的键的哈希码计算在数组中的位置（索引）。 第二步：检查该位置是否为空（即没有键值对存在） 如果为空，则直接在该位置创建一个新的Entry对象来存储键值对。将要添加的键值对作为该Entry的键和值， 并保存在数组的对应位置。将HashMap的修改次数（modCount）加1，以便在进行迭代时发现并发修改。 第三步：如果该位置已经存在其他键值对，检查该位置的第一个键值对的哈希码和键是否与要添加的键值对",
    "keyPoints": [
      "数组、链表、红黑树结构",
      " hash 扰动、索引、键匹配、插入/覆盖、树化条件及 get 查找路径",
      "注明 JDK 8 语境"
    ],
    "followUps": [
      "hashmap的put过程介绍一下？"
    ],
    "tags": [
      "Java集合",
      "HashMap 结构与 put",
      "get 流程",
      "HashMap",
      "put",
      "get"
    ],
    "sourceRef": "Java集合 PDF p.16-20：HashMap 原理；put；put/get；为何用红黑树",
    "source": "builtin",
    "order": 9
  },
  {
    "id": "java-collections-263f97f4f2",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "S",
    "score": 9,
    "question": "HashMap 键的 equals/hashCode 契约应该如何理解？",
    "coreAnswer": "HashMap使用Key对象的hashCode()和equals方法去决定key-value对的索引。当我们试着从HashMap中获取值的 时候，这些方法也会被用到。如果这些方法没有被正确地实现，在这种情况下，两个不同Key也许会产生相同的 hashCode()和equals()输出，HashMap将会认为它们是相同的，然后覆盖它们，而非把它们存储到不同的地方。 同样的，所有不允许存储重复数据的集合类都使用hashCode()和equals()去查找重复，所以正确实现它们非常重 要。…",
    "explanation": "重写HashMap的equal和hashcode方法需要注意什么？：HashMap使用Key对象的hashCode()和equals方法去决定key-value对的索引。当我们试着从HashMap中获取值的 时候，这些方法也会被用到。如果这些方法没有被正确地实现，在这种情况下，两个不同Key也许会产生相同的 hashCode()和equals()输出，HashMap将会认为它们是相同的，然后覆盖它们，而非把它们存储到不同的地方。 同样的，所有不允许存储重复数据的集合类都使用hashCode()和equals()去查找重复，所以正确实现它们非常重 要。equals()和hashCode()的实现应该遵循以下规则： 如果o1.equals(o2)，那么o1.hashCode() == o2.hashCode()总是为true的。 如果o1.hashCode() == o2.hashCode()，并不意味着o1.equals(o2)会为true。",
    "keyPoints": [
      "相等键必须同 hash",
      " String 适合作键的不可变性与缓存",
      "可变键、错误重写 equals/hashCode 会导致查找或去重异常"
    ],
    "followUps": [
      "相等键必须同 hash？",
      " String 适合作键的不可变性与缓存？"
    ],
    "tags": [
      "Java集合",
      "HashMap 键的 equals",
      "hashCode 契约",
      "HashMap",
      "equals",
      "hashCode"
    ],
    "sourceRef": "Java集合 PDF p.19-20：什么适合作 Key；重写 equals/hashCode 的注意点及问题",
    "source": "builtin",
    "order": 10
  },
  {
    "id": "java-collections-84e98859dc",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "S",
    "score": 8,
    "question": "如何理解HashMap 容量、负载因子与扩容？",
    "coreAnswer": "hashMap默认的负载因子是0.75，即如果hashmap中的元素个数超过了总容量75%，则会触发扩容，扩容分为两 个步骤： 第1步是对哈希表长度的扩展（2倍） 第2步是将旧哈希表中的数据放到新的哈希表中。 因为我们使用的是2次幂的扩展(指长度扩为原来2倍)，所以，元素的位置要么是在原位置，要么是在原位置再移动 2次幂的位置。…",
    "explanation": "HashMap的扩容机制介绍一下：hashMap默认的负载因子是0.75，即如果hashmap中的元素个数超过了总容量75%，则会触发扩容，扩容分为两 个步骤： 第1步是对哈希表长度的扩展（2倍） 第2步是将旧哈希表中的数据放到新的哈希表中。 因为我们使用的是2次幂的扩展(指长度扩为原来2倍)，所以，元素的位置要么是在原位置，要么是在原位置再移动 2次幂的位置。 如我们从16扩展为32时，具体的变化如下所示： 因此元素在重新计算hash之后，因为n变为2倍，那么n-1的mask范围在高位多1bit(红色)，因此新的index就会发 生这样的变化： 因此，我们在扩充HashMap的时候，不需要重新计算hash，只需要看看原来的hash值新增的那个bit是1还是0就 好了，是0的话索引没变，是1的话索引变成“原索引+oldCap”。… 说说hashmap的负载因子：HashMap 负载因子 loadFactor 的默认值是 0.75，当 HashMap 中的元素个数超过了容量的 75% 时，就会进行扩 容。 默认负载因子为 0.75，是因为它提供了空间和时间复杂度之间的良好平衡。 负载因子太低会导致大量的空桶浪费空间，负载因子太高会导致大量的碰撞，降低性能。0.75 的负载因子在这两个 因素之间取得了良好的平衡。",
    "keyPoints": [
      "默认容量、0.75 负载因子、阈值和 2 倍扩容",
      "容量为 2 的幂便于取模与迁移",
      "能根据初始容量和元素数推导扩容"
    ],
    "followUps": [
      "说说hashmap的负载因子？"
    ],
    "tags": [
      "Java集合",
      "HashMap 容量",
      "负载因子",
      "扩容",
      "HashMap",
      "HashMap 容量、负载因子与扩容"
    ],
    "sourceRef": "Java集合 PDF p.21-22：扩容机制；容量为何为 2 的幂；负载因子；20 个元素扩容次数",
    "source": "builtin",
    "order": 11
  },
  {
    "id": "java-concurrency-2ea05b147b",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 9,
    "question": "并发问题与三类核心语义应该如何理解？",
    "coreAnswer": "synchronized关键字:可以使用 synchronized 关键字来同步代码块或方法，确保同一时刻只有一个线程可以 访问这些代码。对象锁是通过 synchronized 关键字锁定对象的监视器（monitor）来实现的。 public synchronized void someMethod() { /* ... */ } public void anotherMethod() { synchronized (someObject) { /* ... */ } } volatile关键字: volatile 关键字用于变量，确保所有线程看到的是该变量的最新值，而不是可能存储在本地 寄存器中的副本。…",
    "explanation": "怎么保证多线程安全？：synchronized关键字:可以使用 synchronized 关键字来同步代码块或方法，确保同一时刻只有一个线程可以 访问这些代码。对象锁是通过 synchronized 关键字锁定对象的监视器（monitor）来实现的。 public synchronized void someMethod() { /* ... */ } public void anotherMethod() { synchronized (someObject) { /* ... */ } } volatile关键字: volatile 关键字用于变量，确保所有线程看到的是该变量的最新值，而不是可能存储在本地 寄存器中的副本。…",
    "keyPoints": [
      "能把竞态识别为并发访问共享状态导致的现象或成因",
      "用原子性、可见性、有序性三类语义分析问题",
      "按互斥锁、volatile、原子类、不变对象与线程封闭选择方案"
    ],
    "followUps": [
      "能把竞态识别为并发访问共享状态导致的现象或成因？",
      "用原子性、可见性、有序性三类语义分析问题？"
    ],
    "tags": [
      "Java并发",
      "并发问题",
      "三类核心语义",
      "并发问题与三类核心语义"
    ],
    "sourceRef": "Java并发 PDF p.19-20：并发安全；怎么保证多线程安全",
    "source": "builtin",
    "order": 12
  },
  {
    "id": "java-concurrency-fbc8ec1227",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 9,
    "question": "如何理解synchronized 锁对象、作用域与可重入？",
    "coreAnswer": "锁的对象不同： 普通方法：锁的是当前对象实例（ this ）。同一对象实例的 synchronized 普通方法，同一时间只能被一 个线程访问；不同对象实例间互不影响，可被不同线程同时访问各自的同步普通方法。 静态方法：锁的是当前类的 Class 对象。由于类的 Class 对象全局唯一，无论多少个对象实例，该静态同 步方法同一时间只能被一个线程访问。 作用范围不同： 普通方法：仅对同一对象实例的同步方法调用互斥，不同对象实例的同步普通方法可并行执行。 静态方法：对整个类的所有实例的该静态方法调用都互斥，一个线程进入静态同步方法，其他线程无法进入 同一类任何实例的该方法。…",
    "explanation": "synchronized锁静态方法和普通方法区别？：锁的对象不同： 普通方法：锁的是当前对象实例（ this ）。同一对象实例的 synchronized 普通方法，同一时间只能被一 个线程访问；不同对象实例间互不影响，可被不同线程同时访问各自的同步普通方法。 静态方法：锁的是当前类的 Class 对象。由于类的 Class 对象全局唯一，无论多少个对象实例，该静态同 步方法同一时间只能被一个线程访问。 作用范围不同： 普通方法：仅对同一对象实例的同步方法调用互斥，不同对象实例的同步普通方法可并行执行。 静态方法：对整个类的所有实例的该静态方法调用都互斥，一个线程进入静态同步方法，其他线程无法进入 同一类任何实例的该方法。 多实例场景影响不同： 普通方法：多线程访问不同对象实例的同步普通方法时，可同时执行。 静态方法：不管有多少对象实例，同一时间仅一个线程能执行该静态同步方法。 synchronized 支持重入吗？如何实现的?：synchronized是基于原子性的内部锁机制，是可重入的，因此在一个线程调用synchronized方法的同时在其方法 体内部调用该对象另一个synchronized方法，也就是说一个线程得到一个对象锁后再次请求该对象锁，是允许的， 这就是synchronized的可重入性。 synchronized底层是利用计算机系统mutex Lock实现的。每一个可重入锁都会关联一个线程ID和一个锁状态 status。 当一个线程请求方法时，会去检查锁状态。 1. 如果锁状态是0，代表该锁没有被占用，使用CAS操作获取锁，将线程ID替换成自己的线程ID。 2. 如果锁状态不是0，代表有线程在访问该方法。此时，如果线程ID是自己的线程ID，如果是可重入锁，会将 status自增1，然后获取到该锁，进而执行相应的方法；如果是非重入锁，就会进入阻塞队列等待。…",
    "keyPoints": [
      "实例方法、静态方法与代码块的锁对象",
      "互斥、可见性与 happens-before",
      "可重入的计数语义"
    ],
    "followUps": [
      "synchronized 支持重入吗？如何实现的?"
    ],
    "tags": [
      "Java并发",
      "synchronized 锁对象",
      "作用域",
      "可重入",
      "synchronized",
      "synchronized 锁对象、作用域与可重入"
    ],
    "sourceRef": "Java并发 PDF p.29-30：synchronized 锁静态方法和普通方法的区别；synchronized 如何支持可重入",
    "source": "builtin",
    "order": 13
  },
  {
    "id": "java-concurrency-653798c556",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 9,
    "question": "如何理解CAS、乐观锁与原子类？",
    "coreAnswer": "乐观锁： 就像它的名字一样，对于并发间操作产生的线程安全问题持乐观状态，乐观锁认为竞争不总 是会发 生，因此它不需要持有锁，将比较-替换这两个动作作为一个原子操作尝试去修改内存中的变量，如果失败则 表示发生冲突，那么就应该有相应的重试逻辑。 悲观锁： 还是像它的名字一样，对于并发间操作产生的线程安全问题持悲观状态，悲观锁认为竞争总 是会发 生，因此每次对某资源进行操作时，都会持有一个独占的锁，就像 synchronized，不管三七二十一，直接上 了锁就操作资源了。…",
    "explanation": "悲观锁和乐观锁的区别？：乐观锁： 就像它的名字一样，对于并发间操作产生的线程安全问题持乐观状态，乐观锁认为竞争不总 是会发 生，因此它不需要持有锁，将比较-替换这两个动作作为一个原子操作尝试去修改内存中的变量，如果失败则 表示发生冲突，那么就应该有相应的重试逻辑。 悲观锁： 还是像它的名字一样，对于并发间操作产生的线程安全问题持悲观状态，悲观锁认为竞争总 是会发 生，因此每次对某资源进行操作时，都会持有一个独占的锁，就像 synchronized，不管三七二十一，直接上 了锁就操作资源了。 CAS 有什么缺点？：CAS的缺点主要有3点： ABA问题：ABA的问题指的是在CAS更新的过程中，当读取到的值是A，然后准备赋值的时候仍然是A，但是 实际上有可能A的值被改成了B，然后又被改回了A，这个CAS更新的漏洞就叫做ABA。只是ABA的问题大部分 场景下都不影响并发的最终效果。Java中有AtomicStampedReference来解决这个问题，他加入了预期标志 和更新后标志两个字段，更新时不光检查值，还要检查当前的标志是否等于预期标志，全部相等的话才会更 新。 循环时间长开销大：自旋CAS的方式如果长时间不成功，会给CPU带来很大的开销。 只能保证一个共享变量的原子操作：只对一个共享变量操作可以保证原子性，但是多个则不行，多个可以通 过AtomicReference来处理或者使用锁synchronized实现。 为什么不能所有的锁都用CAS？：CAS操作是基于循环重试的机制，如果CAS操作一直未能成功，线程会一直自旋重试，占用CPU资源。在高并发情 况下，大量线程自旋会导致CPU资源浪费。",
    "keyPoints": [
      "悲观与乐观策略",
      " CAS 比较并替换、重试与 Atomic 类",
      " ABA、自旋消耗、单变量限制及版本号/适时加锁方案"
    ],
    "followUps": [
      "CAS 有什么缺点？",
      "为什么不能所有的锁都用CAS？"
    ],
    "tags": [
      "Java并发",
      "CAS",
      "乐观锁",
      "原子类",
      "CAS、乐观锁与原子类"
    ],
    "sourceRef": "Java并发 PDF p.38-39：悲观锁和乐观锁；CAS 的缺点与解决；为什么不能全用 CAS",
    "source": "builtin",
    "order": 14
  },
  {
    "id": "java-concurrency-8a8f07af12",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 10,
    "question": "如何理解volatile、JMM 可见性与指令重排？",
    "coreAnswer": "volatile关键字可以保证可见性，但不能保证原子性，因此不能完全保证线程安全。volatile关键字用于修饰变量， 当一个线程修改了volatile修饰的变量的值，其他线程能够立即看到最新的值，从而避免了线程之间的数据不一 致。 但是，volatile并不能解决多线程并发下的复合操作问题，比如i++这种操作不是原子操作，如果多个线程同时对i进 行自增操作，volatile不能保证线程安全。对于复合操作，需要使用synchronized关键字或者Lock来保证原子性和 线程安全。…",
    "explanation": "volatile可以保证线程安全吗？：volatile关键字可以保证可见性，但不能保证原子性，因此不能完全保证线程安全。volatile关键字用于修饰变量， 当一个线程修改了volatile修饰的变量的值，其他线程能够立即看到最新的值，从而避免了线程之间的数据不一 致。 但是，volatile并不能解决多线程并发下的复合操作问题，比如i++这种操作不是原子操作，如果多个线程同时对i进 行自增操作，volatile不能保证线程安全。对于复合操作，需要使用synchronized关键字或者Lock来保证原子性和 线程安全。 指令重排序的原理是什么？：在执行程序时，为了提高性能，处理器和编译器常常会对指令进行重排序，但是重排序要满足下面 2 个条件才能进 行： 在单线程环境下不能改变程序运行的结果 存在数据依赖关系的不允许重排序。 所以重排序不会对单线程有影响，只会破坏多线程的执行语义。 我们看这个例子，A和C之间存在数据依赖关系，同时B和C之间也存在数据依赖关系。因此在最终执行的指令序列 中，C不能被重排序到A和B的前面，如果C排到A和B的前面，那么程序的结果将会被改变。但A和B之间没有数据依 赖关系，编译器和处理器可以重排序A和B之间的执行顺序。",
    "keyPoints": [
      "说清 volatile 的可见性和有序性，不把它误说为保证复合操作原子性",
      "能用 happens-before、内存屏障与 num++ 反例比较 synchronized"
    ],
    "followUps": [
      "指令重排序的原理是什么？"
    ],
    "tags": [
      "Java并发",
      "volatile",
      "JMM 可见性",
      "指令重排",
      "JMM",
      "volatile、JMM 可见性与指令重排"
    ],
    "sourceRef": "Java并发 PDF p.39-40：volatile 的作用；指令重排原理；volatile 能否保证线程安全",
    "source": "builtin",
    "order": 15
  },
  {
    "id": "java-concurrency-f1b296ca66",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 8,
    "question": "如何理解ThreadLocal 原理与内存泄漏？",
    "coreAnswer": "ThreadLocal 是Java中用于解决线程安全问题的一种机制，它允许创建线程局部变量，即每个线程都有自己独立的 变量副本，从而避免了线程间的资源共享和同步问题。 从内存结构图，我们可以看到： Thread类中，有个ThreadLocal.ThreadLocalMap 的成员变量。 ThreadLocalMap内部维护了Entry数组，每个Entry代表一个完整的对象，key是ThreadLocal本身，value是 ThreadLocal的泛型对象值。…",
    "explanation": "如何解决?：ThreadLocal 是Java中用于解决线程安全问题的一种机制，它允许创建线程局部变量，即每个线程都有自己独立的 变量副本，从而避免了线程间的资源共享和同步问题。 从内存结构图，我们可以看到： Thread类中，有个ThreadLocal.ThreadLocalMap 的成员变量。 ThreadLocalMap内部维护了Entry数组，每个Entry代表一个完整的对象，key是ThreadLocal本身，value是 ThreadLocal的泛型对象值。 ThreadLocal的作用 线程隔离： ThreadLocal 为每个线程提供了独立的变量副本，这意味着线程之间不会相互影响，可以安全地 在多线程环境中使用这些变量而不必担心数据竞争或同步问题。 降低耦合度：在同一个线程内的多个函数或组件之间，使用 ThreadLocal 可以减少参数的传递，降低代码之 间的耦合度，使代码更加清晰和模块化。…",
    "keyPoints": [
      "说清 Thread、ThreadLocalMap、弱引用 key 与 value 的关系",
      "线程池复用导致的脏数据/泄漏风险",
      " try-finally remove 的使用边界"
    ],
    "followUps": [
      "说清 Thread、ThreadLocalMap、弱引用 key 与 value 的关系？",
      "线程池复用导致的脏数据/泄漏风险？"
    ],
    "tags": [
      "Java并发",
      "ThreadLocal 原理",
      "内存泄漏",
      "ThreadLocal",
      "ThreadLocal 原理与内存泄漏"
    ],
    "sourceRef": "Java并发 PDF p.36-37：ThreadLocal 作用、key/value、实现原理与问题",
    "source": "builtin",
    "order": 16
  },
  {
    "id": "java-thread-pool",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "S",
    "score": 10,
    "question": "线程池任务提交后的执行流程是什么？",
    "coreAnswer": "线程池是为了减少频繁的创建线程和销毁线程带来的性能损耗，线程池的工作原理如下图： 线程池分为核心线程池，线程池的最大容量，还有等待任务的队列，提交一个任务，如果核心线程没有满，就创建 一个线程，如果满了，就是会加入等待队列，如果等待队列满了，就会增加线程，如果达到最大线程数量，如果都 达到最大线程数量，就会按照一些丢弃的策略进行处理。 任务执行流程如下： 线程池的构造函数有7个参数： corePoolSize：线程池核心线程数量。默认情况下，线程池中线程的数量如果 <= corePoolSize，那么即使这 些线程处于空闲状态，那也不会被销毁。…",
    "explanation": "介绍一下线程池的工作原理：线程池是为了减少频繁的创建线程和销毁线程带来的性能损耗，线程池的工作原理如下图： 线程池分为核心线程池，线程池的最大容量，还有等待任务的队列，提交一个任务，如果核心线程没有满，就创建 一个线程，如果满了，就是会加入等待队列，如果等待队列满了，就会增加线程，如果达到最大线程数量，如果都 达到最大线程数量，就会按照一些丢弃的策略进行处理。 任务执行流程如下： 线程池的参数有哪些？：线程池的构造函数有7个参数： corePoolSize：线程池核心线程数量。默认情况下，线程池中线程的数量如果 <= corePoolSize，那么即使这 些线程处于空闲状态，那也不会被销毁。 maximumPoolSize：限制了线程池能创建的最大线程总数（包括核心线程和非核心线程），当 corePoolSize 已满 并且 尝试将新任务加入阻塞队列失败（即队列已满）并且 当前线程数 < maximumPoolSize ，就会创建新线程执行此任务，但是当 corePoolSize 满 并且 队列满 并且 线程数已达 maximumPoolSize 并且 又有新任务提交时，就会触发拒绝策略。 提交新任务 | v 当前线程数 < corePoolSize? ---是---> 创建新线程执行此任务 | 否 | 尝试将任务加入工作队列 | | |<---成功加入？…",
    "keyPoints": [
      "说全七个构造参数",
      "核心线程 -> 队列 -> 非核心线程 -> 拒绝的 execute 路径",
      " execute 与 submit 的异常/返回值"
    ],
    "followUps": [
      "线程池的参数有哪些？"
    ],
    "tags": [
      "Java并发",
      "ThreadPoolExecutor 工作流程",
      "核心参数",
      "ThreadPoolExecutor",
      "ThreadPoolExecutor 工作流程与核心参数"
    ],
    "sourceRef": "Java并发 PDF p.44-45：线程池工作原理；线程池有哪些参数",
    "source": "builtin",
    "order": 17
  },
  {
    "id": "java-jvm-memory",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "S",
    "score": 9,
    "question": "JVM 运行时内存区域有哪些？",
    "coreAnswer": "根据 JDK 8 规范，JVM 运行时内存共分为虚拟机栈、堆、元空间、程序计数器、本地方法栈五个部分。还有一部分 内存叫直接内存，属于操作系统的本地内存，也是可以直接操作的。 JVM的内存结构主要分为以下几个部分： 程序计数器：可以看作是当前线程所执行的字节码的行号指示器，用于存储当前线程正在执行的 Java 方法的 JVM 指令地址。如果线程执行的是 Native 方法，计数器值为 null。是唯一一个在 Java 虚拟机规范中没有规定 任何 OutOfMemoryError 情况的区域，生命周期与线程相同。 Java 虚拟机栈：每个线程都有自己独立的 Java 虚拟机栈，生命周期与线程相同。…",
    "explanation": "JVM的内存模型介绍一下：根据 JDK 8 规范，JVM 运行时内存共分为虚拟机栈、堆、元空间、程序计数器、本地方法栈五个部分。还有一部分 内存叫直接内存，属于操作系统的本地内存，也是可以直接操作的。 JVM的内存结构主要分为以下几个部分： 程序计数器：可以看作是当前线程所执行的字节码的行号指示器，用于存储当前线程正在执行的 Java 方法的 JVM 指令地址。如果线程执行的是 Native 方法，计数器值为 null。是唯一一个在 Java 虚拟机规范中没有规定 任何 OutOfMemoryError 情况的区域，生命周期与线程相同。 Java 虚拟机栈：每个线程都有自己独立的 Java 虚拟机栈，生命周期与线程相同。每个方法在执行时都会创建 一个栈帧，用于存储局部变量表、操作数栈、动态链接、方法出口等信息。可能会抛出 StackOverﬂowError 和 OutOfMemoryError 异常。…",
    "keyPoints": [
      "堆、虚拟机栈、本地方法栈、程序计数器、方法区及直接内存的关系，并标明线程共享性、主要内容和典型异常"
    ],
    "followUps": [
      "堆、虚拟机栈、本地方法栈、程序计数器、方法区及直接内存的关系，并标明线程共享性、主要内容和典型异常？"
    ],
    "tags": [
      "JVM",
      "JVM 运行时内存区域"
    ],
    "sourceRef": "JVM PDF p.1：JVM 的内存模型介绍一下",
    "source": "builtin",
    "order": 18
  },
  {
    "id": "java-class-loading",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "S",
    "score": 8,
    "question": "Java 类加载过程是什么？",
    "coreAnswer": "类从被加载到虚拟机内存开始，到卸载出内存为止，它的整个生命周期包括以下 7 个阶段： 加载：通过类的全限定名（包名 + 类名），获取到该类的.class文件的二进制字节流，将二进制字节流所代表 的静态存储结构，转化为方法区运行时的数据结构，在内存中生成一个代表该类的Java.lang.Class对象，作为 方法区这个类的各种数据的访问入口 连接：验证、准备、解析 3 个阶段统称为连接。 验证：确保class文件中的字节流包含的信息，符合当前虚拟机的要求，保证这个被加载的class类的正确 性，不会危害到虚拟机的安全。…",
    "explanation": "讲一下类加载过程？：类从被加载到虚拟机内存开始，到卸载出内存为止，它的整个生命周期包括以下 7 个阶段： 加载：通过类的全限定名（包名 + 类名），获取到该类的.class文件的二进制字节流，将二进制字节流所代表 的静态存储结构，转化为方法区运行时的数据结构，在内存中生成一个代表该类的Java.lang.Class对象，作为 方法区这个类的各种数据的访问入口 连接：验证、准备、解析 3 个阶段统称为连接。 验证：确保class文件中的字节流包含的信息，符合当前虚拟机的要求，保证这个被加载的class类的正确 性，不会危害到虚拟机的安全。验证阶段大致会完成以下四个阶段的检验动作：文件格式校验、元数据 验证、字节码验证、符号引用验证 准备：为类中的静态字段分配内存，并设置默认的初始值，比如int类型初始值是0。…",
    "keyPoints": [
      "能按加载、验证、准备、解析、初始化说明各阶段目标，区分准备期默认值与初始化期赋值，并列出常见主动初始化触发条件"
    ],
    "followUps": [
      "能按加载、验证、准备、解析、初始化说明各阶段目标，区分准备期默认值与初始化期赋值，并列出常见主动初始化触发条件？"
    ],
    "tags": [
      "JVM",
      "类加载全过程"
    ],
    "sourceRef": "JVM PDF p.12：讲一下类加载过程",
    "source": "builtin",
    "order": 19
  },
  {
    "id": "java-jvm-fb8bb9f944",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "S",
    "score": 8,
    "question": "如何理解对象存活判定与 GC Roots？",
    "coreAnswer": "在Java中，判断对象是否为垃圾（即不再被使用，可以被垃圾回收器回收）主要依据两种主流的垃圾回收算法来实 现：引用计数法和可达性分析算法。 引用计数法（Reference Counting） 原理：为每个对象分配一个引用计数器，每当有一个地方引用它时，计数器加1；当引用失效时，计数器减 1。当计数器为0时，表示对象不再被任何变量引用，可以被回收。 缺点：不能解决循环引用的问题，即两个对象相互引用，但不再被其他任何对象引用，这时引用计数器不会 为0，导致对象无法被回收。 可达性分析算法（Reachability Analysis） Java虚拟机主要采用此算法来判断对象是否为垃圾。…",
    "explanation": "判断垃圾的方法有哪些？：在Java中，判断对象是否为垃圾（即不再被使用，可以被垃圾回收器回收）主要依据两种主流的垃圾回收算法来实 现：引用计数法和可达性分析算法。 引用计数法（Reference Counting） 原理：为每个对象分配一个引用计数器，每当有一个地方引用它时，计数器加1；当引用失效时，计数器减 1。当计数器为0时，表示对象不再被任何变量引用，可以被回收。 缺点：不能解决循环引用的问题，即两个对象相互引用，但不再被其他任何对象引用，这时引用计数器不会 为0，导致对象无法被回收。 可达性分析算法（Reachability Analysis） Java虚拟机主要采用此算法来判断对象是否为垃圾。 原理：从一组称为GC Roots（垃圾收集根）的对象出发，向下追溯它们引用的对象，以及这些对象引用的其 他对象，以此类推。…",
    "keyPoints": [
      "引用计数与可达性分析，列举主要 GC Roots，并说明循环引用为何能被回收以及“不可达”不等于立即回收"
    ],
    "followUps": [
      "引用计数与可达性分析，列举主要 GC Roots，并说明循环引用为何能被回收以及“不可达”不等于立即回收？"
    ],
    "tags": [
      "JVM",
      "对象存活判定与 GC Roots",
      "GC",
      "Roots"
    ],
    "sourceRef": "JVM PDF p.13：判断垃圾的方法有哪些",
    "source": "builtin",
    "order": 20
  },
  {
    "id": "java-jvm-e5a454b484",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "S",
    "score": 8,
    "question": "如何理解垃圾回收算法与分代选择？",
    "coreAnswer": "JVM有垃圾回收机制的原因是为了解决内存管理的问题。在传统的编程语言中，开发人员需要手动分配和释放内 存，这可能导致内存泄漏、内存溢出等问题。而Java作为一种高级语言，旨在提供更简单、更安全的编程环境，因 此引入了垃圾回收机制来自动管理内存。 垃圾回收机制的主要目标是自动检测和回收不再使用的对象，从而释放它们所占用的内存空间。这样可以避免内存 泄漏（一些对象被分配了内存却无法被释放，导致内存资源的浪费）。同时，垃圾回收机制还可以防止内存溢出 （即程序需要的内存超过了可用内存的情况）。 通过垃圾回收机制，JVM可以在程序运行时自动识别和清理不再使用的对象，使得开发人员无需手动管理内存。…",
    "explanation": "垃圾回收算法是什么，是为了解决了什么问题？：JVM有垃圾回收机制的原因是为了解决内存管理的问题。在传统的编程语言中，开发人员需要手动分配和释放内 存，这可能导致内存泄漏、内存溢出等问题。而Java作为一种高级语言，旨在提供更简单、更安全的编程环境，因 此引入了垃圾回收机制来自动管理内存。 垃圾回收机制的主要目标是自动检测和回收不再使用的对象，从而释放它们所占用的内存空间。这样可以避免内存 泄漏（一些对象被分配了内存却无法被释放，导致内存资源的浪费）。同时，垃圾回收机制还可以防止内存溢出 （即程序需要的内存超过了可用内存的情况）。 通过垃圾回收机制，JVM可以在程序运行时自动识别和清理不再使用的对象，使得开发人员无需手动管理内存。这 样可以提高开发效率、减少错误，并且使程序更加可靠和稳定。",
    "keyPoints": [
      "标记-清除、标记-复制、标记-整理的流程、空间与停顿代价，并解释为何新生代和老年代采用不同组合"
    ],
    "followUps": [
      "标记-清除、标记-复制、标记-整理的流程、空间与停顿代价，并解释为何新生代和老年代采用不同组合？"
    ],
    "tags": [
      "JVM",
      "垃圾回收算法",
      "分代选择",
      "垃圾回收算法与分代选择"
    ],
    "sourceRef": "JVM PDF p.14：垃圾回收算法是什么；垃圾回收算法有哪些",
    "source": "builtin",
    "order": 21
  },
  {
    "id": "java-jvm-c35faf8de2",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "S",
    "score": 8,
    "question": "如何理解内存泄漏与内存溢出的区别和排查？",
    "coreAnswer": "内存泄露：内存泄漏是指程序在运行过程中不再使用的对象仍然被引用，而无法被垃圾收集器回收，从而导致可用 内存逐渐减少。虽然在Java中，垃圾回收机制会自动回收不再使用的对象，但如果有对象仍被不再使用的引用持 有，垃圾收集器无法回收这些内存，最终可能导致程序的内存使用不断增加。 内存泄露常见原因： 静态集合：使用静态数据结构（如 HashMap 或 ArrayList ）存储对象，且未清理。 事件监听：未取消对事件源的监听，导致对象持续被引用。 线程：未停止的线程可能持有对象引用，无法被回收。 内存溢出：内存溢出是指Java虚拟机（JVM）在申请内存时，无法找到足够的内存，最终引发 OutOfMemoryError 。…",
    "explanation": "内存泄漏和内存溢出的理解？：内存泄露：内存泄漏是指程序在运行过程中不再使用的对象仍然被引用，而无法被垃圾收集器回收，从而导致可用 内存逐渐减少。虽然在Java中，垃圾回收机制会自动回收不再使用的对象，但如果有对象仍被不再使用的引用持 有，垃圾收集器无法回收这些内存，最终可能导致程序的内存使用不断增加。 内存泄露常见原因： 静态集合：使用静态数据结构（如 HashMap 或 ArrayList ）存储对象，且未清理。 事件监听：未取消对事件源的监听，导致对象持续被引用。 线程：未停止的线程可能持有对象引用，无法被回收。 内存溢出：内存溢出是指Java虚拟机（JVM）在申请内存时，无法找到足够的内存，最终引发 OutOfMemoryError 。这通常发生在堆内存不足以存放新创建的对象时。 内存溢出常见原因： 大量对象创建：程序中不断创建大量对象，超出JVM堆的限制。 持久引用：大型数据结构（如缓存、集合等）长时间持有对象引用，导致内存累积。…",
    "keyPoints": [
      "对象仍可达但无业务价值与内存申请失败，说明二者关系，并给出监控、堆转储、支配树或引用链定位的基本排查顺序"
    ],
    "followUps": [
      "对象仍可达但无业务价值与内存申请失败，说明二者关系，并给出监控、堆转储、支配树或引用链定位的基本排查顺序？"
    ],
    "tags": [
      "JVM",
      "内存泄漏",
      "内存溢出的区别",
      "排查",
      "内存泄漏与内存溢出的区别和排查"
    ],
    "sourceRef": "JVM PDF p.6：内存泄漏和内存溢出的理解",
    "source": "builtin",
    "order": 22
  },
  {
    "id": "java-spring-a8b03b8f41",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 9,
    "question": "如何理解IoC、DI 与控制反转？",
    "coreAnswer": "IOC：Inversion Of Control，即控制反转，是一种设计思想。在传统的 Java SE 程序设计中，我们直接在对象内部 通过 new 的方式来创建对象，是程序主动创建依赖对象； 而在Spring程序设计中，IOC 是有专门的容器去控制对象。 所谓控制就是对象的创建、初始化、销毁。 创建对象：原来是 new 一个，现在是由 Spring 容器创建。 初始化对象：原来是对象自己通过构造器或者 setter 方法给依赖的对象赋值，现在是由 Spring 容器自动注 入。 销毁对象：原来是直接给对象赋值 null 或做一些销毁操作，现在是 Spring 容器管理生命周期负责销毁对象。…",
    "explanation": "怎么理解SpringIoc？：IOC：Inversion Of Control，即控制反转，是一种设计思想。在传统的 Java SE 程序设计中，我们直接在对象内部 通过 new 的方式来创建对象，是程序主动创建依赖对象； 而在Spring程序设计中，IOC 是有专门的容器去控制对象。 所谓控制就是对象的创建、初始化、销毁。 创建对象：原来是 new 一个，现在是由 Spring 容器创建。 初始化对象：原来是对象自己通过构造器或者 setter 方法给依赖的对象赋值，现在是由 Spring 容器自动注 入。 销毁对象：原来是直接给对象赋值 null 或做一些销毁操作，现在是 Spring 容器管理生命周期负责销毁对象。 总结：IOC 解决了繁琐的对象生命周期的操作，解耦了我们的代码。所谓反转：其实是反转的控制权，前面提到是 由 Spring 来控制对象的生命周期，那么对象的控制就完全脱离了我们的控制，控制权交给了 Spring 。… 依赖倒置，依赖注入，控制反转分别是什么？：控制反转：“控制”指的是对程序执行流程的控制，而“反转”指的是在没有使用框架之前，程序员自己控制整个 程序的执行。在使用框架之后，整个程序的执行流程通过框架来控制。流程的控制权从程序员“反转”给了框 架。 依赖注入：依赖注入和控制反转恰恰相反，它是一种具体的编码技巧。我们不通过 new 的方式在类内部创建 依赖类的对象，而是将依赖的类对象在外部创建好之后，通过构造函数、函数参数等方式传递（或注入）给 类来使用。 依赖倒置：这条原则跟控制反转有点类似，主要用来指导框架层面的设计。高层模块不依赖低层模块，它们 共同依赖同一个抽象。抽象不要依赖具体实现细节，具体实现细节依赖抽象。",
    "keyPoints": [
      " IoC、DI、依赖倒置，说明容器如何通过配置、反射和工厂管理对象，并比较构造器、Setter 与字段注入的取舍"
    ],
    "followUps": [
      "依赖倒置，依赖注入，控制反转分别是什么？"
    ],
    "tags": [
      "Spring",
      "IoC",
      "DI 与控制反转",
      "DI",
      "IoC、DI 与控制反转"
    ],
    "sourceRef": "Spring PDF p.3-7：怎么理解 Spring IoC；依赖倒置、依赖注入、控制反转分别是什么",
    "source": "builtin",
    "order": 23
  },
  {
    "id": "java-spring-aeb2ee3ebc",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 9,
    "question": "AOP 原理与代理机制应该如何理解？",
    "coreAnswer": "它的目的是对于面向对象思维的一种补充，而不是像引入命令式、函数式编程思维让他顺应另一种开发场景。在我 个人的理解下AOP更像是一种对于不支持多继承的弥补，除开对象的主要特征（我更喜欢叫“强共性”）被抽象为了 一条继承链路，对于一些“弱共性”，AOP可以统一对他们进行抽象和集中处理。 举一个简单的例子，打印日志。需要打印日志可能是许多对象的一个共性，这在企业级开发中十分常见，但是日志 的打印并不反应这个对象的主要共性。而日志的打印又是一个具体的内容，它并不抽象，所以它的工作也不可以用 接口来完成。而如果利用继承，打印日志的工作又横跨继承树下面的多个同级子节点，强行侵入到继承树内进行归 纳会干扰这些强共性的区分。…",
    "explanation": "SpringAOP主要想解决什么问题：它的目的是对于面向对象思维的一种补充，而不是像引入命令式、函数式编程思维让他顺应另一种开发场景。在我 个人的理解下AOP更像是一种对于不支持多继承的弥补，除开对象的主要特征（我更喜欢叫“强共性”）被抽象为了 一条继承链路，对于一些“弱共性”，AOP可以统一对他们进行抽象和集中处理。 举一个简单的例子，打印日志。需要打印日志可能是许多对象的一个共性，这在企业级开发中十分常见，但是日志 的打印并不反应这个对象的主要共性。而日志的打印又是一个具体的内容，它并不抽象，所以它的工作也不可以用 接口来完成。而如果利用继承，打印日志的工作又横跨继承树下面的多个同级子节点，强行侵入到继承树内进行归 纳会干扰这些强共性的区分。 这时候，我们就需要AOP了。AOP首先在一个Aspect（切面）里定义了一些Advice（增强），其中包含具体实现的 代码，同时整理了切入点，切入点的粒度是方法。… Spring IoC和AOP 介绍一下：Spring IoC和AOP 区别： IoC：即控制反转的意思，它是一种创建和获取对象的技术思想，依赖注入(DI)是实现这种技术的一种方式。 传统开发过程中，我们需要通过new关键字来创建对象。使用IoC思想开发方式的话，我们不通过new关键字 创建对象，而是通过IoC容器来帮我们实例化对象。 通过IoC的方式，可以大大降低对象之间的耦合度。 AOP：是面向切面编程，能够将那些与业务无关，却为业务模块所共同调用的逻辑封装起来，以减少系统的 重复代码，降低模块间的耦合度。Spring AOP 就是基于动态代理的，如果要代理的对象，实现了某个接口， 那么 Spring AOP 会使用 JDK Proxy，去创建代理对象，而对于没有实现接口的对象，就无法使用 JDK Proxy 去进行代理了，这时候 Spring AOP 会使用 Cglib 生成一个被代理对象的子类来作为代理。… 动态代理是什么？：Java的动态代理是一种在运行时动态创建代理对象的机制，主要用于在不修改原始类的情况下对方法调用进行拦截 和增强。 Java动态代理主要分为两种类型： 基于接口的代理（JDK动态代理）： 这种类型的代理要求目标对象必须实现至少一个接口。Java动态代理会创 建一个实现了相同接口的代理类，然后在运行时动态生成该类的实例。…",
    "keyPoints": [
      "切面、连接点、切点、通知和织入，解释 AOP 解决的横切关注点问题，比较 JDK 动态代理、CGLIB 与静态代理的条件和限制"
    ],
    "followUps": [
      "Spring IoC和AOP 介绍一下？",
      "动态代理是什么？"
    ],
    "tags": [
      "Spring",
      "AOP 原理",
      "代理机制",
      "AOP",
      "AOP 原理与代理机制"
    ],
    "sourceRef": "Spring PDF p.3-9：Spring AOP 主要解决什么问题；AOP 原理；动态代理和静态代理的区别",
    "source": "builtin",
    "order": 24
  },
  {
    "id": "java-spring-bd8d5ab963",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 10,
    "question": "Spring 声明式事务主链、传播与失效边界应该如何理解？",
    "coreAnswer": "Spring Boot通过Spring框架的事务管理模块来支持事务操作。事务管理在Spring Boot中通常是通过 @Transactional 注解来实现的。事务可能会失效的一些常见情况包括: 1. 未捕获异常: 如果一个事务方法中发生了未捕获的异常，并且异常未被处理或传播到事务边界之外，那么事务 会失效，所有的数据库操作会回滚。 2. 非受检异常: 默认情况下，Spring对非受检异常（RuntimeException或其子类）进行回滚处理，这意味着当 事务方法中抛出这些异常时，事务会回滚。 3. 事务传播属性设置不当: 如果在多个事务之间存在事务嵌套，且事务传播属性配置不正确，可能导致事务失 效。…",
    "explanation": "Spring的事务什么情况下会失效？：Spring Boot通过Spring框架的事务管理模块来支持事务操作。事务管理在Spring Boot中通常是通过 @Transactional 注解来实现的。事务可能会失效的一些常见情况包括: 1. 未捕获异常: 如果一个事务方法中发生了未捕获的异常，并且异常未被处理或传播到事务边界之外，那么事务 会失效，所有的数据库操作会回滚。 2. 非受检异常: 默认情况下，Spring对非受检异常（RuntimeException或其子类）进行回滚处理，这意味着当 事务方法中抛出这些异常时，事务会回滚。 3. 事务传播属性设置不当: 如果在多个事务之间存在事务嵌套，且事务传播属性配置不正确，可能导致事务失 效。特别是在方法内部调用有 @Transactional 注解的方法时要特别注意。 4. 多数据源的事务管理: 如果在使用多数据源时，事务管理没有正确配置或者存在多个 @Transactional 注解 时，可能会导致事务失效。… Spring的事务，使用this调用是否生效？：不能生效。 因为Spring事务是通过代理对象来控制的，只有通过代理对象的方法调用才会应用事务管理的相关规则。当使用 this 直接调用时，是绕过了Spring的代理机制，因此不会应用事务设置。 springboot怎么开启事务？：在 Spring Boot 中开启事务非常简单，只需在服务层的方法上添加 @Transactional 注解即可。 例如，假设我们有一个 UserService 接口，其中有一个保存用户的方法 saveUser()： public interface UserService { void saveUser(User user); } 我们希望在这个方法中开启事务，只需在该方法上添加 @Transactional 注解，如下所示： public class UserServiceImpl implements UserService { @Autowired private UserRepository userRepository; @Override @Transactional public void saveUser(User user) { userRepository.save(user); } } 这样，当调用 sa…",
    "keyPoints": [
      "能先解释 @Transactional 经代理进入事务拦截器和事务管理器的调用链，说明提交回滚规则、常用传播行为与隔离级别，再从自调用、方法可见性、异常处理、回滚规则和多数据源等角度判断失效并给出修复"
    ],
    "followUps": [
      "Spring的事务，使用this调用是否生效？",
      "springboot怎么开启事务？"
    ],
    "tags": [
      "Spring",
      "Spring 声明式事务主链",
      "传播",
      "失效边界",
      "Spring 声明式事务主链、传播与失效边界"
    ],
    "sourceRef": "Spring PDF p.15-16、p.32-33：Spring 事务什么情况下会失效；使用 this 调用是否生效；Spring Boot 怎么开启事务",
    "source": "builtin",
    "order": 25
  },
  {
    "id": "java-spring-bean-lifecycle",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 9,
    "question": "Spring Bean 的生命周期是什么？",
    "coreAnswer": "1. Spring启动，查找并加载需要被Spring管理的bean，进行Bean的实例化 2. Bean实例化后对将Bean的引入和值注入到Bean的属性中 3. 如果Bean实现了BeanNameAware接口的话，Spring将Bean的Id传递给setBeanName()方法 4. 如果Bean实现了BeanFactoryAware接口的话，Spring将调用setBeanFactory()方法，将BeanFactory容器实 例传入 5. 如果Bean实现了ApplicationContextAware接口的话，Spring将调用Bean的setApplicationContext()方法， 将bean所在应用上下文引用传入…",
    "explanation": "Bean的生命周期说一下？：1. Spring启动，查找并加载需要被Spring管理的bean，进行Bean的实例化 2. Bean实例化后对将Bean的引入和值注入到Bean的属性中 3. 如果Bean实现了BeanNameAware接口的话，Spring将Bean的Id传递给setBeanName()方法 4. 如果Bean实现了BeanFactoryAware接口的话，Spring将调用setBeanFactory()方法，将BeanFactory容器实 例传入 5. 如果Bean实现了ApplicationContextAware接口的话，Spring将调用Bean的setApplicationContext()方法， 将bean所在应用上下文引用传入进来。 6. 如果Bean实现了BeanPostProcessor接口，Spring就将调用他们的postProcessBeforeInitialization()方法。… Spring容器里存的是什么？：在Spring容器中，存储的主要是Bean对象。 Bean是Spring框架中的基本组件，用于表示应用程序中的各种对象。当应用程序启动时，Spring容器会根据配置 文件或注解的方式创建和管理这些Bean对象。Spring容器会负责创建、初始化、注入依赖以及销毁Bean对象。",
    "keyPoints": [
      "能按实例化、属性填充、Aware、前后置处理、初始化、可用、销毁口述主链，并说明 BeanPostProcessor、BeanFactoryPostProcessor、初始化和销毁回调的介入时机"
    ],
    "followUps": [
      "Spring容器里存的是什么？"
    ],
    "tags": [
      "Spring",
      "Bean 生命周期",
      "容器扩展点",
      "Bean",
      "Bean 生命周期与容器扩展点"
    ],
    "sourceRef": "Spring PDF p.16-20：Bean 的生命周期；加载或销毁前后如何加逻辑；Spring 有哪些扩展点",
    "source": "builtin",
    "order": 26
  },
  {
    "id": "java-spring-f452a21f92",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 8,
    "question": "Spring MVC 请求处理流程应该如何理解？",
    "coreAnswer": "Spring MVC的工作流程如下： 1. 用户发送请求至前端控制器DispatcherServlet 2. DispatcherServlet收到请求调用处理器映射器HandlerMapping。 3. 处理器映射器根据请求url找到具体的处理器，生成处理器执行链HandlerExecutionChain(包括处理器对象和 处理器拦截器)一并返回给DispatcherServlet。…",
    "explanation": "了解SpringMVC的处理流程吗？：Spring MVC的工作流程如下： 1. 用户发送请求至前端控制器DispatcherServlet 2. DispatcherServlet收到请求调用处理器映射器HandlerMapping。 3. 处理器映射器根据请求url找到具体的处理器，生成处理器执行链HandlerExecutionChain(包括处理器对象和 处理器拦截器)一并返回给DispatcherServlet。 4. DispatcherServlet根据处理器Handler获取处理器适配器HandlerAdapter执行HandlerAdapter处理一系列的 操作，如：参数封装，数据格式转换，数据验证等操作 5. 执行处理器Handler(Controller，也叫页面控制器)。… Handlermapping 和 handleradapter有了解吗？：HandlerMapping： 作用：HandlerMapping负责将请求映射到处理器（Controller）。 功能：根据请求的URL、请求参数等信息，找到处理请求的 Controller。 类型：Spring提供了多种HandlerMapping实现，如BeanNameUrlHandlerMapping、 RequestMappingHandlerMapping等。 工作流程：根据请求信息确定要请求的处理器(Controller)。HandlerMapping可以根据URL、请求参数等规 则确定对应的处理器。 HandlerAdapter： 作用：HandlerAdapter负责调用处理器(Controller)来处理请求。…",
    "keyPoints": [
      "请求进入 DispatcherServlet 到视图或响应返回完整口述，说明 HandlerMapping、HandlerAdapter、Controller、ViewResolver 的职责及二者为何分离"
    ],
    "followUps": [
      "Handlermapping 和 handleradapter有了解吗？"
    ],
    "tags": [
      "Spring",
      "Spring MVC 请求处理流程",
      "MVC"
    ],
    "sourceRef": "Spring PDF p.21-22：Spring MVC 的处理流程；HandlerMapping 和 HandlerAdapter",
    "source": "builtin",
    "order": 27
  },
  {
    "id": "java-spring-aac5a1aa3c",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "S",
    "score": 9,
    "question": "Spring Boot 自动配置原理应该如何理解？",
    "coreAnswer": "步骤1: 创建Maven项目 首先，需要创建一个新的Maven项目。在pom.xml中添加Spring Boot的starter parent和一些必要的依赖。例如： <parent> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-parent</artifactId> <version>2.7.0</version> <relativePath/> <!-- lookup parent from repository --> </parent> <dependencies> <dependency> <groupId>org.…",
    "explanation": "写过SpringBoot starter吗?：步骤1: 创建Maven项目 首先，需要创建一个新的Maven项目。在pom.xml中添加Spring Boot的starter parent和一些必要的依赖。例如： <parent> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-parent</artifactId> <version>2.7.0</version> <relativePath/> <!-- lookup parent from repository --> </parent> <dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-web</artifactId> </dependency> </depe… Springboot怎么做到导入就可以直接使用的？：这个主要依赖于自动配置、起步依赖和条件注解等特性。 起步依赖 起步依赖是一种特殊的 Maven 或 Gradle 依赖，它将项目所需的一系列依赖打包在一起。例如， spring-boot- starter-web 这个起步依赖就包含了 Spring Web MVC、Tomcat 等构建 Web 应用所需的核心依赖。 开发者只需在项目中添加一个起步依赖，Maven 或 Gradle 就会自动下载并管理与之关联的所有依赖，避免了手动 添加大量依赖的繁琐过程。…",
    "keyPoints": [
      "启动注解讲到自动配置导入、候选配置发现、条件注解匹配和属性绑定，说明“引入依赖即可使用”的成立条件、自动配置如何经条件注解退让，以及属性绑定遵循的外部化配置优先级",
      "不承诺用户同名 Bean 总能直接覆盖"
    ],
    "followUps": [
      "Springboot怎么做到导入就可以直接使用的？"
    ],
    "tags": [
      "Spring",
      "Spring Boot 自动配置原理",
      "Boot"
    ],
    "sourceRef": "Spring PDF p.26-30、p.33-34：Spring Boot 自动装配原理；为什么导入就可以直接使用",
    "source": "builtin",
    "order": 28
  },
  {
    "id": "java-mysql-988176bd81",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解一条 SQL 的执行链路与查询逻辑顺序？",
    "coreAnswer": "所有的查询语句都是从FROM开始执行，在执行过程中，每个步骤都会生成一个虚拟表，这个虚拟表将作为下一个 执行步骤的输入，最后一个步骤产生的虚拟表即为输出结果。 (9) SELECT (10) DISTINCT <column>, (6) AGG_FUNC <column> or <expression>, ... (1) FROM <left_table> (3) <join_type>JOIN<right_table> (2) ON<join_condition> (4) WHERE <where_condition> (5) GROUP BY <group_by_list> (7) WITH {CUBE|ROLLUP} (8)…",
    "explanation": "SQL查询语句的执行顺序是怎么样的？：所有的查询语句都是从FROM开始执行，在执行过程中，每个步骤都会生成一个虚拟表，这个虚拟表将作为下一个 执行步骤的输入，最后一个步骤产生的虚拟表即为输出结果。 (9) SELECT (10) DISTINCT <column>, (6) AGG_FUNC <column> or <expression>, ... (1) FROM <left_table> (3) <join_type>JOIN<right_table> (2) ON<join_condition> (4) WHERE <where_condition> (5) GROUP BY <group_by_list> (7) WITH {CUBE|ROLLUP} (8) HAVING <having_condtion> (11) ORDER BY <order_by_list> (12) LIMIT <limit_number>;",
    "keyPoints": [
      " SQL 书写顺序、逻辑执行顺序和服务端执行链路，口述连接、解析、优化、执行及存储引擎访问的职责边界"
    ],
    "followUps": [
      " SQL 书写顺序、逻辑执行顺序和服务端执行链路，口述连接、解析、优化、执行及存储引擎访问的职责边界？"
    ],
    "tags": [
      "MySQL",
      "一条 SQL 的执行链路",
      "查询逻辑顺序",
      "SQL",
      "一条 SQL 的执行链路与查询逻辑顺序"
    ],
    "sourceRef": "MySQL PDF p.13、p.17：SQL 查询语句的执行顺序；执行一条 SQL 请求的过程",
    "source": "builtin",
    "order": 29
  },
  {
    "id": "java-mysql-dbd4602644",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 10,
    "question": "如何理解B+ 树结构及 MySQL 选型理由？",
    "coreAnswer": "不建议针对性别字段加索引。 实际上与索引创建规则之一区分度有关，性别字段假设有100w数据，50w男、50w女，区别度几乎等于 0 。 区分度的计算方式 ：select count(DISTINCT sex)/count(*) from sys_user 实际上对于性别字段不适合创建索引，是因为select * 操作，还得进行50w次回表操作，根据主键从聚簇索引中找 到其他字段 ，这一部分开销从上面的测试来说还是比较大的，所以从性能角度来看不建议性别字段加索引，加上索 引并不是索引失效，而是回表操作使得变慢的。…",
    "explanation": "性别字段能加索引么？为啥？：不建议针对性别字段加索引。 实际上与索引创建规则之一区分度有关，性别字段假设有100w数据，50w男、50w女，区别度几乎等于 0 。 区分度的计算方式 ：select count(DISTINCT sex)/count(*) from sys_user 实际上对于性别字段不适合创建索引，是因为select * 操作，还得进行50w次回表操作，根据主键从聚簇索引中找 到其他字段 ，这一部分开销从上面的测试来说还是比较大的，所以从性能角度来看不建议性别字段加索引，加上索 引并不是索引失效，而是回表操作使得变慢的。 既然走索引的查询的成本比全表扫描高，优化器就会选择全表扫描的方向进行查询，这时候建立的性别字段索引就 没有启到加快查询的作用，反而还因为创建了索引占用了空间。 B+树的特性是什么？：所有叶子节点都在同一层：这是B+树的一个重要特性，确保了所有数据项的检索都具有相同的I/O延迟，提高 了搜索效率。每个叶子节点都包含指向相邻叶子节点的指针，形成一个链表，由于叶子节点之间的链接， B+树非常适合进行范围查询和排序扫描。可以沿着叶子节点的链表顺序访问数据，而无需进行多次随机访 问。 非叶子节点存储键值：非叶子节点仅存储键值和指向子节点的指针，不包含数据记录。这些键值用于指导搜 索路径，帮助快速定位到正确的叶子节点。并且，由于非叶子节点只存放键值，当数据量比较大时，相对于B 树，B+树的层高更少，查找效率也就更高。 叶子节点存储数据记录：与B树不同，B+树的叶子节点存储实际的数据记录或指向数据记录的指针。这意味着 每次搜索都会到达叶子节点，才能找到所需数据。 自平衡：B+树在插入、删除和更新操作后会自动重新平衡，确保树的高度保持相对稳定，从而保持良好的搜 索性能。… 说说B+树和B树的区别：在B+树中，数据都存储在叶子节点上，而非叶子节点只存储索引信息；而B树的非叶子节点既存储索引信息也 存储部分数据。 B+树的叶子节点使用链表相连，便于范围查询和顺序访问；B树的叶子节点没有链表连接。 B+树的查找性能更稳定，每次查找都需要查找到叶子节点；而B树的查找可能会在非叶子节点找到数据，性能 相对不稳定。 为什么 MysSQL 不用 跳表？：B+树的高度在3层时存储的数据可能已达千万级别，但对于跳表而言同样去维护千万的数据量那么所造成的跳表层 数过高而导致的磁盘io次数增多，也就是使用B+树在存储同样的数据下磁盘io次数更少。",
    "keyPoints": [
      " B+ 树非叶子与叶子节点，说明叶子链表、页和树高，比较 B 树、二叉树、哈希与跳表，并解释范围查询和磁盘 IO 优势"
    ],
    "followUps": [
      "B+树的特性是什么？",
      "说说B+树和B树的区别？"
    ],
    "tags": [
      "MySQL",
      "B+ 树结构及 MySQL 选型理由",
      "B+"
    ],
    "sourceRef": "MySQL PDF p.25-30：索引如何实现；B+ 树特性；B+ 树与 B 树区别；为什么不用跳表",
    "source": "builtin",
    "order": 30
  },
  {
    "id": "java-mysql-7fb90d6835",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解联合索引与最左前缀原则？",
    "coreAnswer": "将将多个字段组合成一个索引，该索引就被称为联合索引。 比如，将商品表中的 product_no 和 name 字段组合成联合索引(product_no, name)，创建联合索引的方式如下： CREATE INDEX index_product_no_name ON product(product_no, name); 联合索引(product_no, name) 的 B+Tree 示意图如下： 可以看到，联合索引的非叶子节点用两个字段的值作为 B+Tree 的 key 值。当在联合索引查询数据时，先按 product_no 字段比较，在 product_no 相同的情况下再按 name 字段比较。…",
    "explanation": "联合索引的实现原理？：将将多个字段组合成一个索引，该索引就被称为联合索引。 比如，将商品表中的 product_no 和 name 字段组合成联合索引(product_no, name)，创建联合索引的方式如下： CREATE INDEX index_product_no_name ON product(product_no, name); 联合索引(product_no, name) 的 B+Tree 示意图如下： 可以看到，联合索引的非叶子节点用两个字段的值作为 B+Tree 的 key 值。当在联合索引查询数据时，先按 product_no 字段比较，在 product_no 相同的情况下再按 name 字段比较。 也就是说，联合索引查询的 B+Tree 是先按 product_no 进行排序，然后再 product_no 相同的情况再按 name 字 段排序。 因此，使用联合索引时，存在最左匹配原则，也就是按照最左优先的方式进行索引的匹配。… 创建联合索引时需要注意什么？：建立联合索引时的字段顺序，对索引效率也有很大影响。越靠前的字段被用于索引过滤的概率越高，实际开发工作 中建立联合索引时，要把区分度大的字段排在前面，这样区分度大的字段越有可能被更多的 SQL 使用到。 区分度就是某个字段 column 不同值的个数「除以」表的总行数，计算公式如下： 比如，性别的区分度就很小，不适合建立索引或不适合排在联合索引列的靠前的位置，而 UUID 这类字段就比较适 合做索引或排在联合索引列的靠前的位置。 因为如果索引的区分度很小，假设字段的值分布均匀，那么无论搜索哪个值都可能得到一半的数据。在这些情况 下，还不如不要索引，因为 MySQL 还有一个查询优化器，查询优化器发现某个值出现在表的数据行中的百分比 （惯用的百分比界线是\"30%\"）很高的时候，它一般会忽略索引，进行全表扫描。",
    "keyPoints": [
      "能依据联合索引键序判断等值、范围、跳列和乱序条件可利用的索引部分，解释最左前缀来源，而非只背“遇到范围就失效”"
    ],
    "followUps": [
      "创建联合索引时需要注意什么？"
    ],
    "tags": [
      "MySQL",
      "联合索引",
      "最左前缀原则",
      "联合索引与最左前缀原则"
    ],
    "sourceRef": "MySQL PDF p.30-33：联合索引实现原理；创建联合索引注意什么；多组联合索引条件如何走",
    "source": "builtin",
    "order": 31
  },
  {
    "id": "java-mysql-65f98387e4",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解索引失效、覆盖索引与减少回表？",
    "coreAnswer": "6 种会发生索引失效的情况： 当我们使用左或者左右模糊匹配的时候，也就是 like %xx 或者 like %xx%这两种方式都会造成索引失效； 当我们在查询条件中对索引列使用函数，就会导致索引失效。 当我们在查询条件中对索引列进行表达式计算，也是无法走索引的。 MySQL 在遇到字符串和数字比较的时候，会自动把字符串转为数字，然后再进行比较。如果字符串是索引 列，而条件语句中的输入参数是数字的话，那么索引列会发生隐式类型转换，由于隐式类型转换是通过 CAST 函数实现的，等同于对索引列使用了函数，所以就会导致索引失效。 联合索引要能正确使用需要遵循最左匹配原则，也就是按照最左优先的方式进行索引的匹配，否则就会导致 索引失效。…",
    "explanation": "索引失效有哪些？：6 种会发生索引失效的情况： 当我们使用左或者左右模糊匹配的时候，也就是 like %xx 或者 like %xx%这两种方式都会造成索引失效； 当我们在查询条件中对索引列使用函数，就会导致索引失效。 当我们在查询条件中对索引列进行表达式计算，也是无法走索引的。 MySQL 在遇到字符串和数字比较的时候，会自动把字符串转为数字，然后再进行比较。如果字符串是索引 列，而条件语句中的输入参数是数字的话，那么索引列会发生隐式类型转换，由于隐式类型转换是通过 CAST 函数实现的，等同于对索引列使用了函数，所以就会导致索引失效。 联合索引要能正确使用需要遵循最左匹配原则，也就是按照最左优先的方式进行索引的匹配，否则就会导致 索引失效。 在 WHERE 子句中，如果在 OR 前的条件列是索引列，而在 OR 后的条件列不是索引列，那么索引会失效。 什么是覆盖索引？：覆盖索引是指一个索引包含了查询所需的所有列，因此不需要访问表中的数据行就能完成查询。 换句话说，查询所需的所有数据都能从索引中直接获取，而不需要进行回表查询。覆盖索引能够显著提高查询性 能，因为减少了访问数据页的次数，从而减少了I/O操作。… 索引优化详细讲讲：常见优化索引的方法： 前缀索引优化：使用前缀索引是为了减小索引字段大小，可以增加一个索引页中存储的索引值，有效提高索 引的查询速度。在一些大字符串的字段作为索引时，使用前缀索引可以帮助我们减小索引项的大小。 覆盖索引优化：覆盖索引是指 SQL 中 query 的所有字段，在索引 B+Tree 的叶子节点上都能找得到的那些索 引，从二级索引中查询得到记录，而不需要通过聚簇索引查询获得，可以避免回表的操作。 主键索引最好是自增的： 如果我们使用自增主键，那么每次插入的新数据就会按顺序添加到当前索引节点的位置，不需要移动已 有的数据，当页面写满，就会自动开辟一个新页面。因为每次插入一条新记录，都是追加操作，不需要 重新移动数据，因此这种插入数据的方法效率非常高。…",
    "keyPoints": [
      "能判断函数运算、隐式转换、模糊匹配和组合条件等常见失效风险，解释覆盖索引如何避免回表，并用 EXPLAIN 验证而非绝对化规则"
    ],
    "followUps": [
      "什么是覆盖索引？",
      "索引优化详细讲讲？"
    ],
    "tags": [
      "MySQL",
      "索引失效",
      "覆盖索引",
      "减少回表",
      "索引失效、覆盖索引与减少回表"
    ],
    "sourceRef": "MySQL PDF p.33-35：索引失效有哪些；什么情况下回表；什么是覆盖索引；索引优化",
    "source": "builtin",
    "order": 32
  },
  {
    "id": "java-mysql-5dfbce2d39",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解事务 ACID 及其实现基础？",
    "coreAnswer": "原子性（Atomicity）：一个事务中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环 节，而且事务在执行过程中发生错误，会被回滚到事务开始前的状态，就像这个事务从来没有执行过一样， 就好比买一件商品，购买成功时，则给商家付了钱，商品到手；购买失败时，则商品在商家手中，消费者的 钱也没花出去。 一致性（Consistency）：是指事务操作前和操作后，数据满足完整性约束，数据库保持一致性状态。比 如，用户 A 和用户 B 在银行分别有 800 元和 600 元，总共 1400 元，用户 A 给用户 B 转账 200 元，分为两 个步骤，从 A 的账户扣除 200 元和对 B 的账户增加 200 元。…",
    "explanation": "事务的特性是什么？如何实现的？：原子性（Atomicity）：一个事务中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环 节，而且事务在执行过程中发生错误，会被回滚到事务开始前的状态，就像这个事务从来没有执行过一样， 就好比买一件商品，购买成功时，则给商家付了钱，商品到手；购买失败时，则商品在商家手中，消费者的 钱也没花出去。 一致性（Consistency）：是指事务操作前和操作后，数据满足完整性约束，数据库保持一致性状态。比 如，用户 A 和用户 B 在银行分别有 800 元和 600 元，总共 1400 元，用户 A 给用户 B 转账 200 元，分为两 个步骤，从 A 的账户扣除 200 元和对 B 的账户增加 200 元。… mysql的是怎么解决并发问题的？：锁机制：Mysql提供了多种锁机制来保证数据的一致性，包括行级锁、表级锁、页级锁等。通过锁机制，可以 在读写操作时对数据进行加锁，确保同时只有一个操作能够访问或修改数据。 事务隔离级别：Mysql提供了多种事务隔离级别，包括读未提交、读已提交、可重复读和串行化。通过设置合 适的事务隔离级别，可以在多个事务并发执行时，控制事务之间的隔离程度，以避免数据不一致的问题。 MVCC（多版本并发控制）：Mysql使用MVCC来管理并发访问，它通过在数据库中保存不同版本的数据来实 现不同事务之间的隔离。在读取数据时，Mysql会根据事务的隔离级别来选择合适的数据版本，从而保证数据 的一致性。",
    "keyPoints": [
      "能定义原子性、一致性、隔离性和持久性，并把原子性与 undo、持久性与 redo、隔离性与锁及 MVCC 建立正确联系",
      "明确一致性是综合结果"
    ],
    "followUps": [
      "mysql的是怎么解决并发问题的？"
    ],
    "tags": [
      "MySQL",
      "事务 ACID 及其实现基础",
      "ACID"
    ],
    "sourceRef": "MySQL PDF p.36-38：事务的特性是什么；事务特性如何实现；MySQL 如何解决并发问题",
    "source": "builtin",
    "order": 33
  },
  {
    "id": "java-mysql-8496b13824",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 10,
    "question": "如何理解并发异常与事务隔离级别？",
    "coreAnswer": "MySQL 服务端是允许多个客户端连接的，这意味着 MySQL 会出现同时处理多个事务的情况。 那么在同时处理多个事务的时候，就可能出现脏读（dirty read）、不可重复读（non-repeatable read）、幻读 （phantom read）的问题。 接下来，通过举例子给大家说明，这些问题是如何发生的。 脏读 如果一个事务「读到」了另一个「未提交事务修改过的数据」，就意味着发生了「脏读」现象。 举个栗子。…",
    "explanation": "mysql可能出现什么和并发相关问题？：MySQL 服务端是允许多个客户端连接的，这意味着 MySQL 会出现同时处理多个事务的情况。 那么在同时处理多个事务的时候，就可能出现脏读（dirty read）、不可重复读（non-repeatable read）、幻读 （phantom read）的问题。 接下来，通过举例子给大家说明，这些问题是如何发生的。 脏读 如果一个事务「读到」了另一个「未提交事务修改过的数据」，就意味着发生了「脏读」现象。 举个栗子。 假设有 A 和 B 这两个事务同时在处理，事务 A 先开始从数据库中读取小林的余额数据，然后再执行更新操作，如 果此时事务 A 还没有提交事务，而此时正好事务 B 也从数据库中读取小林的余额数据，那么事务 B 读取到的余额 数据是刚才事务 A 更新后的数据，即使没有提交事务。… 事务的隔离级别有哪些？：读未提交（read uncommitted），指一个事务还没提交时，它做的变更就能被其他事务看到； 读提交（read committed），指一个事务提交之后，它做的变更才能被其他事务看到； 可重复读（repeatable read），指一个事务执行过程中看到的数据，一直跟这个事务启动时看到的数据是一 致的，MySQL InnoDB 引擎的默认隔离级别； 串行化（serializable）；会对记录加上读写锁，在多个事务对这条记录进行读写操作时，如果发生了读写冲 突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行； 按隔离水平高低排序如下： 针对不同的隔离级别，并发事务时可能发生的现象也会不同。 也就是说： 在「读未提交」隔离级别下，可能发生脏读、不可重复读和幻读现象； 在「读提交」隔离级别下，可能发生不可重复读和幻读现象，但是不可能发生脏读现象；…",
    "keyPoints": [
      "能用时序例子区分脏读、不可重复读和幻读，列出四种隔离级别及 MySQL 默认 RR，并说明隔离越强通常并发代价越高"
    ],
    "followUps": [
      "事务的隔离级别有哪些？"
    ],
    "tags": [
      "MySQL",
      "并发异常",
      "事务隔离级别",
      "并发异常与事务隔离级别"
    ],
    "sourceRef": "MySQL PDF p.36-41：并发会出现什么问题；隔离级别有哪些；MySQL 默认级别是什么",
    "source": "builtin",
    "order": 34
  },
  {
    "id": "java-mysql-9cff46a7d5",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 10,
    "question": "如何理解MVCC、Read View 与 undo 版本链？",
    "coreAnswer": "MVCC允许多个事务同时读取同一行数据，而不会彼此阻塞，每个事务看到的数据版本是该事务开始时的数据版 本。这意味着，如果其他事务在此期间修改了数据，正在运行的事务仍然看到的是它开始时的数据状态，从而实现 了非阻塞读操作。",
    "explanation": "介绍MVCC实现原理：MVCC允许多个事务同时读取同一行数据，而不会彼此阻塞，每个事务看到的数据版本是该事务开始时的数据版 本。这意味着，如果其他事务在此期间修改了数据，正在运行的事务仍然看到的是它开始时的数据状态，从而实现 了非阻塞读操作。",
    "keyPoints": [
      "隐藏事务字段、undo 版本链和 Read View 的作用，按事务 ID 可见性规则判断一次快照读，并区分 RC 每次读与 RR 首次一致性读创建视图的时机"
    ],
    "followUps": [
      "隐藏事务字段、undo 版本链和 Read View 的作用，按事务 ID 可见性规则判断一次快照读，并区分 RC 每次读与 RR 首次一致性读创建视图的时机？"
    ],
    "tags": [
      "MySQL",
      "MVCC",
      "Read View",
      "undo 版本链",
      "Read",
      "View"
    ],
    "sourceRef": "MySQL PDF p.42-43：介绍 MVCC 实现原理",
    "source": "builtin",
    "order": 35
  },
  {
    "id": "java-mysql-842214f66c",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解MySQL 锁体系、索引与阻塞范围？",
    "coreAnswer": "在 MySQL 里，根据加锁的范围，可以分为全局锁、表级锁和行锁三类。 全局锁：通过ﬂush tables with read lock 语句会将整个数据库就处于只读状态了，这时其他线程执行以下操 作，增删改或者表结构修改都会阻塞。全局锁主要应用于做全库逻辑备份，这样在备份数据库期间，不会因 为数据或表结构的更新，而出现备份文件的数据与预期的不一样。 表级锁：MySQL 里面表级别的锁有这几种： 表锁：通过lock tables 语句可以对表加表锁，表锁除了会限制别的线程的读写外，也会限制本线程接下 来的读写操作。…",
    "explanation": "讲一下mysql里有哪些锁？：在 MySQL 里，根据加锁的范围，可以分为全局锁、表级锁和行锁三类。 全局锁：通过ﬂush tables with read lock 语句会将整个数据库就处于只读状态了，这时其他线程执行以下操 作，增删改或者表结构修改都会阻塞。全局锁主要应用于做全库逻辑备份，这样在备份数据库期间，不会因 为数据或表结构的更新，而出现备份文件的数据与预期的不一样。 表级锁：MySQL 里面表级别的锁有这几种： 表锁：通过lock tables 语句可以对表加表锁，表锁除了会限制别的线程的读写外，也会限制本线程接下 来的读写操作。 元数据锁：当我们对数据库表进行操作时，会自动给这个表加上 MDL，对一张表进行 CRUD 操作时，加 的是 MDL 读锁；对一张表做结构变更操作的时候，加的是 MDL 写锁；MDL 是为了保证当用户对表执 行 CRUD 操作时，防止其他线程对这个表结构做了变更。… 数据库的表锁和行锁有什么作用？：表锁的作用： 整体控制：表锁可以用来控制整个表的并发访问，当一个事务获取了表锁时，其他事务无法对该表进行任何 读写操作，从而确保数据的完整性和一致性。 粒度大：表锁的粒度比较大，在锁定表的情况下，可能会影响到整个表的其他操作，可能会引起锁竞争和性 能问题。 适用于大批量操作：表锁适合于需要大批量操作表中数据的场景，例如表的重建、大量数据的加载等。 行锁的作用： 细粒度控制：行锁可以精确控制对表中某行数据的访问，使得其他事务可以同时访问表中的其他行数据，在 并发量大的系统中能够提高并发性能。 减少锁冲突：行锁不会像表锁那样造成整个表的锁冲突，减少了锁竞争的可能性，提高了并发访问的效率。 适用于频繁单行操作：行锁适合于需要频繁对表中单独行进行操作的场景，例如订单系统中的订单修改、删 除等操作。 一条update是不是原子性的？为什么？：是原子性，主要通过锁+undolog 日志保证原子性的 执行 update 的时候，会加行级别锁，保证了一个事务更新一条记录的时候，不会被其他事务干扰。 事务执行过程中，会生成 undolog，如果事务执行失败，就可以通过 undolog 日志进行回滚。",
    "keyPoints": [
      "全局锁、表级锁和行级锁，说明记录锁、间隙锁、next-key lock 与意向锁",
      "能根据隔离级别、唯一或非唯一索引、等值或范围条件及实际访问路径共同判断更新的加锁与阻塞范围，不把“行锁”理解为固定锁一行"
    ],
    "followUps": [
      "数据库的表锁和行锁有什么作用？",
      "一条update是不是原子性的？为什么？"
    ],
    "tags": [
      "MySQL",
      "MySQL 锁体系",
      "索引",
      "阻塞范围",
      "MySQL 锁体系、索引与阻塞范围"
    ],
    "sourceRef": "MySQL PDF p.44-46：MySQL 有哪些锁；表锁和行锁作用；并发 update 是否阻塞；非索引范围更新是否阻塞",
    "source": "builtin",
    "order": 36
  },
  {
    "id": "java-mysql-eb8cf8ba63",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 10,
    "question": "如何理解undo、redo、binlog 与两阶段提交？",
    "coreAnswer": "事务提交后，redo log 和 binlog 都要持久化到磁盘，但是这两个是独立的逻辑，可能出现半成功的状态，这样就 造成两份日志之间的逻辑不一致。 在 MySQL 的 InnoDB 存储引擎中，开启 binlog 的情况下，MySQL 会同时维护 binlog 日志与 InnoDB 的 redo log，为了保证这两个日志的一致性，MySQL 使用了内部 XA 事务（是的，也有外部 XA 事务，跟本文不太相关， 我就不介绍了），内部 XA 事务由 binlog 作为协调者，存储引擎是参与者。…",
    "explanation": "binlog 两阶段提交过程是怎么样的？：事务提交后，redo log 和 binlog 都要持久化到磁盘，但是这两个是独立的逻辑，可能出现半成功的状态，这样就 造成两份日志之间的逻辑不一致。 在 MySQL 的 InnoDB 存储引擎中，开启 binlog 的情况下，MySQL 会同时维护 binlog 日志与 InnoDB 的 redo log，为了保证这两个日志的一致性，MySQL 使用了内部 XA 事务（是的，也有外部 XA 事务，跟本文不太相关， 我就不介绍了），内部 XA 事务由 binlog 作为协调者，存储引擎是参与者。… 讲一下binlog：MySQL 在完成一条更新操作后，Server 层还会生成一条 binlog，等之后事务提交的时候，会将该事物执行过程中 产生的所有 binlog 统一写 入 binlog 文件，binlog 是 MySQL 的 Server 层实现的日志，所有存储引擎都可以使 用。 binlog 是追加写，写满一个文件，就创建一个新的文件继续写，不会覆盖以前的日志，保存的是全量的日志，用于 备份恢复、主从复制； binlog 文件是记录了所有数据库表结构变更和表数据修改的日志，不会记录查询类的操作，比如 SELECT 和 SHOW 操作。… UndoLog日志的作用是什么？：undo log 是一种用于撤销回退的日志，它保证了事务的 ACID 特性中的原子性（Atomicity）。 在事务没提交之前，MySQL 会先记录更新前的数据到 undo log 日志文件里面，当事务回滚时，可以利用 undo log 来进行回滚。如下图： 每当 InnoDB 引擎对一条记录进行操作（修改、删除、新增）时，要把回滚时需要的信息都记录到 undo log 里， 比如： 在插入一条记录时，要把这条记录的主键值记下来，这样之后回滚时只需要把这个主键值对应的记录删掉就 好了； 在删除一条记录时，要把这条记录中的内容都记下来，这样之后回滚时再把由这些内容组成的记录插入到表 中就好了； 在更新一条记录时，要把被更新的列的旧值记下来，这样之后回滚时再把这些列更新为旧值就好了。 在发生回滚时，就读取 undo log 里的数据，然后做原先相反操作。… 有了undolog为啥还需要redolog呢？…",
    "keyPoints": [
      "三类日志的层级、内容、写入时机和用途，口述 redo 的 WAL 与持久化过程，并说明 redo 与 binlog 两阶段提交如何维持崩溃后的两份日志一致"
    ],
    "followUps": [
      "讲一下binlog？",
      "UndoLog日志的作用是什么？"
    ],
    "tags": [
      "MySQL",
      "undo",
      "redo",
      "binlog 与两阶段提交",
      "binlog",
      "undo、redo、binlog 与两阶段提交"
    ],
    "sourceRef": "MySQL PDF p.46-53：日志分哪几种；binlog；undo log 作用；为什么还需要 redo；两阶段提交过程",
    "source": "builtin",
    "order": 37
  },
  {
    "id": "java-mysql-0361325bb4",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "S",
    "score": 9,
    "question": "如何理解EXPLAIN 驱动的 SQL 性能诊断？",
    "coreAnswer": "explain 是查看 sql 的执行计划，主要用来分析 sql 语句的执行过程，比如有没有走索引，有没有外部排序，有没 有索引覆盖等等。 如下图，就是一个没有使用索引，并且是一个全表扫描的查询语句。 对于执行计划，参数有： possible_keys 字段表示可能用到的索引； key 字段表示实际用的索引，如果这一项为 NULL，说明没有使用索引； key_len 表示索引的长度； rows 表示扫描的数据行数。 type 表示数据扫描类型，我们需要重点看这个。…",
    "explanation": "mysql的explain有什么作用？：explain 是查看 sql 的执行计划，主要用来分析 sql 语句的执行过程，比如有没有走索引，有没有外部排序，有没 有索引覆盖等等。 如下图，就是一个没有使用索引，并且是一个全表扫描的查询语句。 对于执行计划，参数有： possible_keys 字段表示可能用到的索引； key 字段表示实际用的索引，如果这一项为 NULL，说明没有使用索引； key_len 表示索引的长度； rows 表示扫描的数据行数。 type 表示数据扫描类型，我们需要重点看这个。 type 字段就是描述了找到所需数据时使用的扫描方式是什么，常见扫描类型的执行效率从低到高的顺序为： All（全表扫描）：在这些情况里，all 是最坏的情况，因为采用了全表扫描的方式。 index（全索引扫描）：index 和 all 差不多，只不过 index 对索引表进行全扫描，这样做的好处是不再需要 对数据进行排序，但是开销依然很大。…",
    "keyPoints": [
      "慢 SQL 发现开始，依次检查数据量、执行计划、扫描行数、访问类型、索引、排序与临时表，再考虑 SQL 改写、结构调整和缓存",
      "优化不能只回答“加索引”"
    ],
    "followUps": [
      "慢 SQL 发现开始，依次检查数据量、执行计划、扫描行数、访问类型、索引、排序与临时表，再考虑 SQL 改写、结构调整和缓存？",
      "优化不能只回答“加索引”？"
    ],
    "tags": [
      "MySQL",
      "EXPLAIN 驱动的 SQL 性能诊断",
      "EXPLAIN",
      "SQL"
    ],
    "sourceRef": "MySQL PDF p.57-58：EXPLAIN 有什么作用；查询很慢有哪些解决方案",
    "source": "builtin",
    "order": 38
  },
  {
    "id": "java-redis-0edbf12d07",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 9,
    "question": "Redis 数据类型与业务场景应该如何理解？",
    "coreAnswer": "Redis 提供了丰富的数据类型，常见的有五种数据类型：String（字符串），Hash（哈希），List（列表）， Set（集合）、Zset（有序集合）。 随着 Redis 版本的更新，后面又支持了四种数据类型：BitMap（2.2 版新增）、HyperLogLog（2.8 版新增）、 GEO（3.2 版新增）、Stream（5.0 版新增）。Redis 五种数据类型的应用场景： String 类型的应用场景：缓存对象、常规计数、分布式锁、共享 session 信息等。 List 类型的应用场景：消息队列（但是有两个问题：1. 生产者需要自行实现全局唯一 ID；2. 不能以消费组形 式消费数据）等。…",
    "explanation": "讲一下Redis底层的数据结构：Redis 提供了丰富的数据类型，常见的有五种数据类型：String（字符串），Hash（哈希），List（列表）， Set（集合）、Zset（有序集合）。 随着 Redis 版本的更新，后面又支持了四种数据类型：BitMap（2.2 版新增）、HyperLogLog（2.8 版新增）、 GEO（3.2 版新增）、Stream（5.0 版新增）。Redis 五种数据类型的应用场景： String 类型的应用场景：缓存对象、常规计数、分布式锁、共享 session 信息等。 List 类型的应用场景：消息队列（但是有两个问题：1. 生产者需要自行实现全局唯一 ID；2. 不能以消费组形 式消费数据）等。 Hash 类型：缓存对象、购物车等。 Set 类型：聚合计算（并集、交集、差集）场景，比如点赞、共同关注、抽奖活动等。 Zset 类型：排序场景，比如排行榜、电话和姓名排序等。… redis应用场景是什么？：Redis 是一种基于内存的数据库，对数据的读写操作都是在内存中完成，因此读写速度非常快，常用于缓存，消息 队列、分布式锁等场景。 缓存: Redis最常见的用途就是作为缓存系统。通过将热门数据存储在内存中，可以极大地提高访问速度，减 轻数据库负载，这对于需要快速响应时间的应用程序非常重要。 排行榜: Redis的有序集合结构非常适合用于实现排行榜和排名系统，可以方便地进行数据排序和排名。 分布式锁: Redis的特性可以用来实现分布式锁，确保多个进程或服务之间的数据操作的原子性和一致性。 计数器 由于Redis的原子操作和高性能，它非常适合用于实现计数器和统计数据的存储，如网站访问量统计、 点赞数统计等。 消息队列: Redis的发布订阅功能使其成为一个轻量级的消息队列，它可以用来实现发布和订阅模式，以便实 时处理消息。 Redis除了缓存，还有哪些应用?：Redis实现消息队列 使用Pub/Sub模式：Redis的Pub/Sub是一种基于发布/订阅的消息模式，任何客户端都可以订阅一个或多个 频道，发布者可以向特定频道发送消息，所有订阅该频道的客户端都会收到此消息。该方式实现起来比较简 单，发布者和订阅者完全解耦，支持模式匹配订阅。但是这种方式不支持消息持久化，消息发布后若无订阅 者在线则会被丢弃；不保证消息的顺序和可靠性传输。…",
    "keyPoints": [
      "能按 String、Hash、List、Set、ZSet 说明核心语义和典型场景，补充 Bitmap、HyperLogLog、GEO、Stream 的用途，并为缓存、计数、排行榜、签到、消息流等需求选择结构"
    ],
    "followUps": [
      "redis应用场景是什么？",
      "Redis除了缓存，还有哪些应用?"
    ],
    "tags": [
      "Redis",
      "Redis 数据类型",
      "业务场景",
      "Redis 数据类型与业务场景"
    ],
    "sourceRef": "Redis PDF p.1-2、p.37-38：Redis 底层数据结构；Redis 应用场景；除了缓存还能做什么",
    "source": "builtin",
    "order": 39
  },
  {
    "id": "java-redis-f640c4f949",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 9,
    "question": "Redis 高性能原因与线程模型应该如何理解？",
    "coreAnswer": "官方使用基准测试的结果是，单线程的 Redis 吞吐量可以达到 10W/每秒，如下图所示： 之所以 Redis 采用单线程（网络 I/O 和执行命令）那么快，有如下几个原因： Redis 的大部分操作都在内存中完成，并且采用了高效的数据结构，因此 Redis 瓶颈可能是机器的内存或者网 络带宽，而并非 CPU，既然 CPU 不是瓶颈，那么自然就采用单线程的解决方案了； Redis 采用单线程模型可以避免了多线程之间的竞争，省去了多线程切换带来的时间和性能上的开销，而且也 不会导致死锁问题。…",
    "explanation": "Redis为什么快？：官方使用基准测试的结果是，单线程的 Redis 吞吐量可以达到 10W/每秒，如下图所示： 之所以 Redis 采用单线程（网络 I/O 和执行命令）那么快，有如下几个原因： Redis 的大部分操作都在内存中完成，并且采用了高效的数据结构，因此 Redis 瓶颈可能是机器的内存或者网 络带宽，而并非 CPU，既然 CPU 不是瓶颈，那么自然就采用单线程的解决方案了； Redis 采用单线程模型可以避免了多线程之间的竞争，省去了多线程切换带来的时间和性能上的开销，而且也 不会导致死锁问题。 Redis 采用了 I/O 多路复用机制处理大量的客户端 Socket 请求，IO 多路复用机制是指一个线程处理多个 IO 流，就是我们经常听到的 select/epoll 机制。简单来说，在 Redis 只运行单线程的情况下，该机制允许内核 中，同时存在多个监听 Socket 和已连接 Socket。… Redis哪些地方使用了多线程?：Redis 单线程指的是「接收客户端请求->解析请求 ->进行数据读写等操作->发送数据给客户端」这个过程是由一个 线程（主线程）来完成的，这也是我们常说 Redis 是单线程的原因。 但是，Redis 程序并不是单线程的，Redis 在启动的时候，是会启动后台线程（BIO）的： Redis 在 2.6 版本，会启动 2 个后台线程，分别处理关闭文件、AOF 刷盘这两个任务； Redis 在 4.0 版本之后，新增了一个新的后台线程，用来异步释放 Redis 内存，也就是 lazyfree 线程。例如 执行 unlink key / ﬂushdb async / ﬂushall async 等命令，会把这些删除操作交给后台线程来执行，好处是不 会导致 Redis 主线程卡顿。… 为什么redis比mysql要快？：内存存储：Redis 是基于内存存储的 NoSQL 数据库，而 MySQL 是基于磁盘存储的关系型数据库。由于内存 存储速度快，Redis 能够更快地读取和写入数据，而无需像 MySQL 那样频繁进行磁盘 I/O 操作。 简单数据结构：Redis 是基于键值对存储数据的，支持简单的数据结构（字符串、哈希、列表、集合、有序集 合）。相比之下，MySQL 需要定义表结构、索引等复杂的关系型数据结构，因此在某些场景下 Redis 的数据",
    "keyPoints": [
      "内存访问、数据结构、事件驱动、命令执行路径和减少上下文切换说明性能来源，区分命令执行主线程、后台线程及 Redis 6 网络 I/O 多线程，避免概括为“Redis 完全单线程”"
    ],
    "followUps": [
      "Redis哪些地方使用了多线程?",
      "为什么redis比mysql要快？"
    ],
    "tags": [
      "Redis",
      "Redis 高性能原因",
      "线程模型",
      "Redis 高性能原因与线程模型"
    ],
    "sourceRef": "Redis PDF p.11-13、p.34-36：Redis 为什么快；哪些地方使用多线程；为什么比 MySQL 快",
    "source": "builtin",
    "order": 40
  },
  {
    "id": "java-redis-e206fed85b",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 9,
    "question": "如何理解RDB、AOF 与混合持久化？",
    "coreAnswer": "Redis 的读写操作都是在内存中，所以 Redis 性能才会高，但是当 Redis 重启后，内存中的数据就会丢失，那为了 保证内存中的数据不会丢失，Redis 实现了数据持久化的机制，这个机制会把数据存储到磁盘，这样在 Redis 重启 就能够从磁盘中恢复原有的数据。Redis 共有三种数据持久化的方式： AOF 日志：每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里； RDB 快照：将某一时刻的内存数据，以二进制的方式写入磁盘； Redis 在执行完一条写操作命令后，就会把该命令以追加的方式写入到一个文件里，然后 Redis 重启时，会读取该 文件记录的命令，然后逐一执行命令的方式来进行数据恢复。…",
    "explanation": "Redis有哪2种持久化方式？分别的优缺点是什么？：Redis 的读写操作都是在内存中，所以 Redis 性能才会高，但是当 Redis 重启后，内存中的数据就会丢失，那为了 保证内存中的数据不会丢失，Redis 实现了数据持久化的机制，这个机制会把数据存储到磁盘，这样在 Redis 重启 就能够从磁盘中恢复原有的数据。Redis 共有三种数据持久化的方式： AOF 日志：每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里； RDB 快照：将某一时刻的内存数据，以二进制的方式写入磁盘； AOF 日志是如何实现的？：Redis 在执行完一条写操作命令后，就会把该命令以追加的方式写入到一个文件里，然后 Redis 重启时，会读取该 文件记录的命令，然后逐一执行命令的方式来进行数据恢复。 我这里以「set name xiaolin」命令作为例子，Redis 执行了这条命令后，记录在 AOF 日志里的内容如下图： Redis 提供了 3 种写回硬盘的策略， 在 Redis.conf 配置文件中的 appendfsync 配置项可以有以下 3 种参数可填： Always，这个单词的意思是「总是」，所以它的意思是每次写操作命令执行完后，同步将 AOF 日志数据写回 硬盘； Everysec，这个单词的意思是「每秒」，所以它的意思是每次写操作命令执行完后，先将命令写入到 AOF 文 件的内核缓冲区，然后每隔一秒将缓冲区里的内容写回到硬盘；…",
    "keyPoints": [
      " RDB 快照、AOF 追加和混合持久化的触发、写入、恢复、体积与数据丢失窗口，说明 fork、写时复制、AOF 刷盘策略和重写的作用"
    ],
    "followUps": [
      "AOF 日志是如何实现的？"
    ],
    "tags": [
      "Redis",
      "RDB",
      "AOF 与混合持久化",
      "AOF",
      "RDB、AOF 与混合持久化"
    ],
    "sourceRef": "Redis PDF p.16-18：Redis 有哪两种持久化方式；各自优缺点",
    "source": "builtin",
    "order": 41
  },
  {
    "id": "java-redis-ad81c1d5fe",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 9,
    "question": "如何理解过期删除与内存淘汰？",
    "coreAnswer": "区别： 内存淘汰策略是在内存满了的时候，redis 会触发内存淘汰策略，来淘汰一些不必要的内存资源，以腾出空 间，来保存新的内容 过期键删除策略是将已过期的键值对进行删除，Redis 采用的删除策略是惰性删除+定期删除。 不会，Redis 的过期删除策略是选择「惰性删除+定期删除」这两种策略配和使用。 惰性删除策略的做法是，不主动删除过期键，每次从数据库访问 key 时，都检测 key 是否过期，如果过期则 删除该 key。 定期删除策略的做法是，每隔一段时间「随机」从数据库中取出一定数量的 key 进行检查，并删除其中的过 期key。",
    "explanation": "过期删除策略和内存淘汰策略有什么区别？：区别： 内存淘汰策略是在内存满了的时候，redis 会触发内存淘汰策略，来淘汰一些不必要的内存资源，以腾出空 间，来保存新的内容 过期键删除策略是将已过期的键值对进行删除，Redis 采用的删除策略是惰性删除+定期删除。 Redis的缓存失效会不会立即删除？：不会，Redis 的过期删除策略是选择「惰性删除+定期删除」这两种策略配和使用。 惰性删除策略的做法是，不主动删除过期键，每次从数据库访问 key 时，都检测 key 是否过期，如果过期则 删除该 key。 定期删除策略的做法是，每隔一段时间「随机」从数据库中取出一定数量的 key 进行检查，并删除其中的过 期key。",
    "keyPoints": [
      " Key 到期与内存不足两类触发，说明惰性删除和定期删除，按 noeviction、volatile、allkeys 及 LRU、LFU、random、TTL 维度选择淘汰策略，并解释为何不做全量立即删除"
    ],
    "followUps": [
      "Redis的缓存失效会不会立即删除？"
    ],
    "tags": [
      "Redis",
      "过期删除",
      "内存淘汰",
      "过期删除与内存淘汰"
    ],
    "sourceRef": "Redis PDF p.19-24：过期删除和内存淘汰的区别；各自策略；缓存失效是否立即删除",
    "source": "builtin",
    "order": 42
  },
  {
    "id": "java-redis-d98a39a391",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 10,
    "question": "如何理解Redis 与数据库缓存一致性？",
    "coreAnswer": "对于读数据，我会选择旁路缓存策略，如果 cache 不命中，会从 db 加载数据到 cache。对于写数据，我会选择更 新 db 后，再删除缓存。 缓存是通过牺牲强一致性来提高性能的。这是由CAP理论决定的。缓存系统适用的场景就是非强一致性的场景，它 属于CAP中的AP。所以，如果需要数据库和缓存数据保持强一致，就不适合使用缓存。 所以使用缓存提升性能，就是会有数据更新的延迟。这需要我们在设计时结合业务仔细思考是否适合用缓存。然后 缓存一定要设置过期时间，这个时间太短、或者太长都不好： 太短的话请求可能会比较多的落到数据库上，这也意味着失去了缓存的优势。…",
    "explanation": "如何保证 redis 和 mysql 数据缓存一致性问题？：对于读数据，我会选择旁路缓存策略，如果 cache 不命中，会从 db 加载数据到 cache。对于写数据，我会选择更 新 db 后，再删除缓存。 缓存是通过牺牲强一致性来提高性能的。这是由CAP理论决定的。缓存系统适用的场景就是非强一致性的场景，它 属于CAP中的AP。所以，如果需要数据库和缓存数据保持强一致，就不适合使用缓存。 所以使用缓存提升性能，就是会有数据更新的延迟。这需要我们在设计时结合业务仔细思考是否适合用缓存。然后 缓存一定要设置过期时间，这个时间太短、或者太长都不好： 太短的话请求可能会比较多的落到数据库上，这也意味着失去了缓存的优势。 太长的话缓存中的脏数据会使系统长时间处于一个延迟的状态，而且系统中长时间没有人访问的数据一直存 在内存中不过期，浪费内存。 但是，通过一些方案优化处理，是可以最终一致性的。…",
    "keyPoints": [
      "能以 Cache Aside 口述读写链路，比较更新数据库后删缓存与其他顺序的并发窗口，说明删除失败重试、消息队列或 binlog 订阅、幂等与最终一致性边界，不承诺强一致"
    ],
    "followUps": [
      "能以 Cache Aside 口述读写链路，比较更新数据库后删缓存与其他顺序的并发窗口，说明删除失败重试、消息队列或 binlog 订阅、幂等与最终一致性边界，不承诺强一致？"
    ],
    "tags": [
      "Redis",
      "Redis 与数据库缓存一致性"
    ],
    "sourceRef": "Redis PDF p.40-42：如何保证 Redis 和 MySQL 缓存一致性",
    "source": "builtin",
    "order": 43
  },
  {
    "id": "java-redis-9382642624",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 10,
    "question": "如何理解缓存雪崩、击穿与穿透？",
    "coreAnswer": "缓存雪崩：当大量缓存数据在同一时间过期（失效）或者 Redis 故障宕机时，如果此时有大量的用户请求， 都无法在 Redis 中处理，于是全部请求都直接访问数据库，从而导致数据库的压力骤增，严重的会造成数据 库宕机，从而形成一系列连锁反应，造成整个系统崩溃，这就是缓存雪崩的问题。 缓存击穿：如果缓存中的某个热点数据过期了，此时大量的请求访问了该热点数据，就无法从缓存中读取， 直接访问数据库，数据库很容易就被高并发的请求冲垮，这就是缓存击穿的问题。 缓存穿透：当用户访问的数据，既不在缓存中，也不在数据库中，导致请求在访问缓存时，发现缓存缺失， 再去访问数据库时，发现数据库中也没有要访问的数据，没办法构建缓存数据，来服务后续的请求。…",
    "explanation": "缓存雪崩、击穿、穿透是什么？怎么解决？：缓存雪崩：当大量缓存数据在同一时间过期（失效）或者 Redis 故障宕机时，如果此时有大量的用户请求， 都无法在 Redis 中处理，于是全部请求都直接访问数据库，从而导致数据库的压力骤增，严重的会造成数据 库宕机，从而形成一系列连锁反应，造成整个系统崩溃，这就是缓存雪崩的问题。 缓存击穿：如果缓存中的某个热点数据过期了，此时大量的请求访问了该热点数据，就无法从缓存中读取， 直接访问数据库，数据库很容易就被高并发的请求冲垮，这就是缓存击穿的问题。 缓存穿透：当用户访问的数据，既不在缓存中，也不在数据库中，导致请求在访问缓存时，发现缓存缺失， 再去访问数据库时，发现数据库中也没有要访问的数据，没办法构建缓存数据，来服务后续的请求。那么当 有大量这样的请求到来时，数据库的压力骤增，这就是缓存穿透的问题。 缓存雪崩解决方案： 均匀设置过期时间：如果要给缓存数据设置过期时间，应该避免将大量的数据设置成同一个过期时间。…",
    "keyPoints": [
      "能按“发生对象、流量形态、数据库压力”区分三者，分别给出随机过期、多级缓存与降级，互斥重建或逻辑过期，参数校验、空值缓存或布隆过滤器，并说明各方案副作用"
    ],
    "followUps": [
      "能按“发生对象、流量形态、数据库压力”区分三者，分别给出随机过期、多级缓存与降级，互斥重建或逻辑过期，参数校验、空值缓存或布隆过滤器，并说明各方案副作用？"
    ],
    "tags": [
      "Redis",
      "缓存雪崩",
      "击穿",
      "穿透",
      "缓存雪崩、击穿与穿透"
    ],
    "sourceRef": "Redis PDF p.42-46：缓存雪崩、击穿、穿透是什么；怎么解决",
    "source": "builtin",
    "order": 44
  },
  {
    "id": "java-redis-9c4100a583",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "S",
    "score": 10,
    "question": "如何理解Redis 分布式锁正确性？",
    "coreAnswer": "分布式锁是用于分布式环境下并发控制的一种机制，用于控制某个资源在同一时刻只能被一个应用所使用。如下图 所示： Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写 性能高，可以应对高并发的锁操作场景。Redis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可 以用它来实现分布式锁： 如果 key 不存在，则显示插入成功，可以用来表示加锁成功； 如果 key 存在，则会显示插入失败，可以用来表示加锁失败。 基于 Redis 节点实现分布式锁时，对于加锁操作，我们需要满足三个条件。…",
    "explanation": "Redis分布式锁的实现原理？什么场景下用到分布式锁？：分布式锁是用于分布式环境下并发控制的一种机制，用于控制某个资源在同一时刻只能被一个应用所使用。如下图 所示： Redis 本身可以被多个客户端共享访问，正好就是一个共享存储系统，可以用来保存分布式锁，而且 Redis 的读写 性能高，可以应对高并发的锁操作场景。Redis 的 SET 命令有个 NX 参数可以实现「key不存在才插入」，所以可 以用它来实现分布式锁： 如果 key 不存在，则显示插入成功，可以用来表示加锁成功； 如果 key 存在，则会显示插入失败，可以用来表示加锁失败。 基于 Redis 节点实现分布式锁时，对于加锁操作，我们需要满足三个条件。 加锁包括了读取锁变量、检查锁变量值和设置锁变量值三个操作，但需要以原子操作的方式完成，所以，我 们使用 SET 命令带上 NX 选项来实现加锁；…",
    "keyPoints": [
      " SET NX PX 加唯一令牌的加锁约束，用 Lua 校验令牌后删除",
      "旧持有者租约过期后仍可能继续写、主从异步复制与切换可能破坏互斥，并说明高正确性场景需使用 fencing token 或下游版本校验，业务幂等不能替代 fencing"
    ],
    "followUps": [
      " SET NX PX 加唯一令牌的加锁约束，用 Lua 校验令牌后删除？",
      "旧持有者租约过期后仍可能继续写、主从异步复制与切换可能破坏互斥，并说明高正确性场景需使用 fencing token 或下游版本校验，业务幂等不能替代 fencing？"
    ],
    "tags": [
      "Redis",
      "Redis 分布式锁正确性"
    ],
    "sourceRef": "Redis PDF p.37-39：Redis 分布式锁的实现原理；什么场景使用",
    "source": "builtin",
    "order": 45
  },
  {
    "id": "java-network-31f8adbd5d",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 9,
    "question": "如何理解HTTP 报文、方法与状态码？",
    "coreAnswer": "分请求报文和响应报文来说明。 请求报文： 请求行：包含请求方法、请求目标（URL或URI）和HTTP协议版本。 请求头部：包含关于请求的附加信息，如Host、User-Agent、Content-Type等。 空行：请求头部和请求体之间用空行分隔。 请求体：可选，包含请求的数据，通常用于POST请求等需要传输数据的情况。 响应报文： 状态行：包含HTTP协议版本、状态码和状态信息。 响应头部：包含关于响应的附加信息，如Content-Type、Content-Length等。 空行：响应头部和响应体之间用空行分隔。 响应体：包含响应的数据，通常是服务器返回的HTML、JSON等内容。…",
    "explanation": "HTTP报文有哪些部分？：分请求报文和响应报文来说明。 请求报文： 请求行：包含请求方法、请求目标（URL或URI）和HTTP协议版本。 请求头部：包含关于请求的附加信息，如Host、User-Agent、Content-Type等。 空行：请求头部和请求体之间用空行分隔。 请求体：可选，包含请求的数据，通常用于POST请求等需要传输数据的情况。 响应报文： 状态行：包含HTTP协议版本、状态码和状态信息。 响应头部：包含关于响应的附加信息，如Content-Type、Content-Length等。 空行：响应头部和响应体之间用空行分隔。 响应体：包含响应的数据，通常是服务器返回的HTML、JSON等内容。 HTTP常用的状态码？：HTTP 状态码分为 5 大类 1xx 类状态码属于提示信息，是协议处理中的一种中间状态，实际用到的比较少。 2xx 类状态码表示服务器成功处理了客户端的请求，也是我们最愿意看到的状态。 3xx 类状态码表示客户端请求的资源发生了变动，需要客户端用新的 URL 重新发送请求获取资源，也就是重 定向。 4xx 类状态码表示客户端发送的报文有误，服务器无法处理，也就是错误码的含义。 5xx 类状态码表示客户端请求报文正确，但是服务器处理时内部发生了错误，属于服务器端的错误码。 其中常见的具体状态码有： 200：请求成功； 301：永久重定向；302：临时重定向； 404：无法找到此页面；405：请求的方法类型不支持； 500：服务器内部出错。 GET和POST的使用场景，有哪些区别？：根据 RFC 规范，GET 的语义是从服务器获取指定的资源，这个资源可以是静态的文本、页面、图片视频等。GET 请求的参数位置一般是写在 URL 中，URL 规定只能支持 ASCII，所以 GET 请求的参数只允许 ASCII 字符 ，而且浏 览器会对 URL 的长度有限制（HTTP协议本身对 URL长度并没有做任何规定）。 比如，你打开我的文章，浏览器就会发送 GET 请求给服务器，服务器就会返回文章的所有文字及资源。 根据 RFC 规范，POST 的语义是根据请求负荷（报文body）对指定的资源做出处理，具体的处理方式视资源类型 而不同。POST 请求携带数据的位置一般是写在报文 body 中，body 中的数据可以是任意格式的数据，只要客户端 与服务端协商好即可，而且浏览器不会对 body 大小做限制。…",
    "keyPoints": [
      "能说清请求行、请求头、空行、请求体及响应对应结构，比较 GET、POST 等方法的语义、安全性、幂等性，并按类别解释常见状态码"
    ],
    "followUps": [
      "HTTP常用的状态码？",
      "GET和POST的使用场景，有哪些区别？"
    ],
    "tags": [
      "计算机网络",
      "HTTP 报文",
      "方法",
      "状态码",
      "HTTP",
      "HTTP 报文、方法与状态码"
    ],
    "sourceRef": "网络 PDF p.4-7：HTTP 报文有哪些部分；常用状态码；请求类型；GET 和 POST 的使用场景与区别",
    "source": "builtin",
    "order": 46
  },
  {
    "id": "java-network-aacb8aa499",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 10,
    "question": "如何理解HTTP 与 HTTPS 及 TLS 握手？",
    "coreAnswer": "HTTP 由于是明文传输，所以安全上存在以下三个风险： 窃听风险，比如通信链路上可以获取通信内容，用户号容易没。 篡改风险，比如强制植入垃圾广告，视觉污染，用户眼容易瞎。 冒充风险，比如冒充淘宝网站，用户钱容易没。 HTTPS 在 HTTP 与 TCP 层之间加入了 SSL/TLS 协议，可以很好的解决了上述的风险： 信息加密：交互信息无法被窃取，但你的号会因为「自身忘记」账号而没。 校验机制：无法篡改通信内容，篡改了就不能正常显示，但百度「竞价排名」依然可以搜索垃圾广告。 身份证书：证明淘宝是真的淘宝网，但你的钱还是会因为「剁手」而没。 区别主要有以下四点： HTTP 是超文本传输协议，信息是明文传输，存在安全风险的问题。…",
    "explanation": "HTTP为什么不安全？：HTTP 由于是明文传输，所以安全上存在以下三个风险： 窃听风险，比如通信链路上可以获取通信内容，用户号容易没。 篡改风险，比如强制植入垃圾广告，视觉污染，用户眼容易瞎。 冒充风险，比如冒充淘宝网站，用户钱容易没。 HTTPS 在 HTTP 与 TCP 层之间加入了 SSL/TLS 协议，可以很好的解决了上述的风险： 信息加密：交互信息无法被窃取，但你的号会因为「自身忘记」账号而没。 校验机制：无法篡改通信内容，篡改了就不能正常显示，但百度「竞价排名」依然可以搜索垃圾广告。 身份证书：证明淘宝是真的淘宝网，但你的钱还是会因为「剁手」而没。 HTTP和HTTPS 的区别？：区别主要有以下四点： HTTP 是超文本传输协议，信息是明文传输，存在安全风险的问题。HTTPS 则解决 HTTP 不安全的缺陷，在 TCP 和 HTTP 网络层之间加入了 SSL/TLS 安全协议，使得报文能够加密传输。 HTTP 连接建立相对简单， TCP 三次握手之后便可进行 HTTP 的报文传输。而 HTTPS 在 TCP 三次握手之后， 还需进行 SSL/TLS 的握手过程，才可进入加密报文传输。 两者的默认端口不一样，HTTP 默认端口号是 80，HTTPS 默认端口号是 443。 HTTPS 协议需要向 CA（证书权威机构）申请数字证书，来保证服务器的身份是可信的。 HTTPS握手过程说一下：传统的 TLS 握手基本都是使用 RSA 算法来实现密钥交换的，在将 TLS 证书部署服务端时，证书文件其实就是服务 端的公钥，会在 TLS 握手阶段传递给客户端，而服务端的私钥则一直留在服务端，一定要确保私钥不能被窃取。 在 RSA 密钥协商算法中，客户端会生成随机密钥，并使用服务端的公钥加密后再传给服务端。根据非对称加密算 法，公钥加密的消息仅能通过私钥解密，这样服务端解密后，双方就得到了相同的密钥，再用它加密应用消息。 我用 Wireshark 工具抓了用 RSA 密钥交换的 TLS 握手过程，你可以从下面看到，一共经历了四次握手： TLS 第一次握手 首先，由客户端向服务器发起加密通信请求，也就是 ClientHello 请求。在这一步，客户端主要向服务器发送以下 信息： （1）客户端支持的 TLS 协议版本，如 TLS 1.2 版本。…",
    "keyPoints": [
      "明文 HTTP 与 HTTPS 的机密性、完整性和身份认证，分别口述 TLS 1.2 与 TLS 1.3 的握手和密钥协商差异，明确不能用一套固定步骤概括所有 TLS 版本"
    ],
    "followUps": [
      "HTTP和HTTPS 的区别？",
      "HTTPS握手过程说一下？"
    ],
    "tags": [
      "计算机网络",
      "HTTP",
      "HTTPS",
      "TLS 握手",
      "TLS",
      "HTTP 与 HTTPS 及 TLS 握手"
    ],
    "sourceRef": "网络 PDF p.13-16：HTTP 为什么不安全；HTTP 和 HTTPS 的区别；HTTPS 握手过程；如何防范中间人攻击",
    "source": "builtin",
    "order": 47
  },
  {
    "id": "java-network-1a068e81a9",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 9,
    "question": "DNS 域名解析链路应该如何理解？",
    "coreAnswer": "1. 客户端首先会发出一个 DNS 请求，问 www.server.com 的 IP 是啥，并发给本地 DNS 服务器（也就是客户端 的 TCP/IP 设置中填写的 DNS 服务器地址）。 2. 本地域名服务器收到客户端的请求后，如果缓存里的表格能找到 www.server.com，则它直接返回 IP 地址。 如果没有，本地 DNS 会去问它的根域名服务器：“老大， 能告诉我 www.server.com 的 IP 地址吗？” 根域名 服务器是最高层次的，它不直接用于域名解析，但能指明一条道路。…",
    "explanation": "DNS 域名解析的工作流程？：1. 客户端首先会发出一个 DNS 请求，问 www.server.com 的 IP 是啥，并发给本地 DNS 服务器（也就是客户端 的 TCP/IP 设置中填写的 DNS 服务器地址）。 2. 本地域名服务器收到客户端的请求后，如果缓存里的表格能找到 www.server.com，则它直接返回 IP 地址。 如果没有，本地 DNS 会去问它的根域名服务器：“老大， 能告诉我 www.server.com 的 IP 地址吗？” 根域名 服务器是最高层次的，它不直接用于域名解析，但能指明一条道路。 3. 根 DNS 收到来自本地 DNS 的请求后，发现后置是 .com，说：“www.server.com 这个域名归 .com 区域管 理”，我给你 .com 顶级域名服务器地址给你，你去问问它吧。” 4. 本地 DNS 收到顶级域名服务器的地址后，发起请求问“老二， 你能告诉我 www.server.com 的 IP 地址吗？… DNS的底层使用TCP还是UDP？：DNS 基于UDP协议实现，DNS使用UDP协议进行域名解析和数据传输。因为基于UDP实现DNS能够提供低延迟、 简单快速、轻量级的特性，更适合DNS这种需要快速响应的域名解析服务。 低延迟： UDP是一种无连接的协议，不需要在数据传输前建立连接，因此可以减少传输时延，适合DNS这种 需要快速响应的应用场景。 简单快速： UDP相比于TCP更简单，没有TCP的连接管理和流量控制机制，传输效率更高，适合DNS这种需要 快速传输数据的场景。 轻量级：UDP头部较小，占用较少的网络资源，对于小型请求和响应来说更加轻量级，适合DNS这种频繁且 短小的数据交换。 尽管 UDP 存在丢包和数据包损坏的风险，但在 DNS 的设计中，这些风险是可以被容忍的。DNS 使用了一些机制 来提高可靠性，例如查询超时重传、请求重试、缓存等，以确保数据传输的可靠性和正确性。",
    "keyPoints": [
      "浏览器和操作系统缓存、递归解析器、根、顶级域、权威 DNS 口述解析链路，说明 53 端口及 UDP 为主、TCP 用于大响应或区域传送等边界"
    ],
    "followUps": [
      "DNS的底层使用TCP还是UDP？"
    ],
    "tags": [
      "计算机网络",
      "DNS 域名解析链路",
      "DNS"
    ],
    "sourceRef": "网络 PDF p.17-19：DNS 全称；域名解析工作流程；DNS 端口；底层使用 TCP 还是 UDP",
    "source": "builtin",
    "order": 48
  },
  {
    "id": "java-network-c35476cc07",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 10,
    "question": "如何理解Cookie、Session 与 Token 身份状态？",
    "coreAnswer": "session存储于服务器，可以理解为一个状态列表，拥有一个唯一识别符号sessionId，通常存放于cookie中。 服务器收到cookie后解析出sessionId，再去session列表中查找，才能找到相应session，依赖cookie。 cookie类似一个令牌，装有sessionId，存储在客户端，浏览器通常会自动添加。 token也类似一个令牌，无状态，用户信息都被加密到token中，服务器收到token后解密就可知道是哪个用 户，需要开发者手动添加。",
    "explanation": "token，session，cookie的区别？：session存储于服务器，可以理解为一个状态列表，拥有一个唯一识别符号sessionId，通常存放于cookie中。 服务器收到cookie后解析出sessionId，再去session列表中查找，才能找到相应session，依赖cookie。 cookie类似一个令牌，装有sessionId，存储在客户端，浏览器通常会自动添加。 token也类似一个令牌，无状态，用户信息都被加密到token中，服务器收到token后解密就可知道是哪个用 户，需要开发者手动添加。",
    "keyPoints": [
      " Cookie 的客户端存储和自动携带、Session 的服务端状态、Token 的凭证语义，解释禁用 Cookie 时 Session ID 的替代传递方式，并从扩展性、安全和注销选择方案"
    ],
    "followUps": [
      " Cookie 的客户端存储和自动携带、Session 的服务端状态、Token 的凭证语义，解释禁用 Cookie 时 Session ID 的替代传递方式，并从扩展性、安全和注销选择方案？"
    ],
    "tags": [
      "计算机网络",
      "Cookie",
      "Session",
      "Token 身份状态",
      "Token",
      "Cookie、Session 与 Token 身份状态"
    ],
    "sourceRef": "网络 PDF p.19-21：HTTP 是否无状态；携带 Cookie 是否有状态；Cookie、Session、Token 区别；禁用 Cookie 后 Session 是否可用",
    "source": "builtin",
    "order": 49
  },
  {
    "id": "java-network-ad1eebf72c",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 10,
    "question": "如何理解TCP 头部与三次握手？",
    "coreAnswer": "标注颜色的表示与本文关联比较大的字段，其他字段不做详细阐述。 序列号：在建立连接时由计算机生成的随机数作为其初始值，通过 SYN 包传给接收端主机，每发送一次数据，就 「累加」一次该「数据字节数」的大小。用来解决网络包乱序问题。 确认应答号：指下一次「期望」收到的数据的序列号，发送端收到这个确认应答以后可以认为在这个序号以前的数 据都已经被正常接收。用来解决丢包的问题。 控制位： ACK：该位为 1 时，「确认应答」的字段变为有效，TCP 规定除了最初建立连接时的 SYN 包之外该位必须设 置为 1 。 RST：该位为 1 时，表示 TCP 连接中出现异常必须强制断开连接。…",
    "explanation": "说一下tcp的头部：标注颜色的表示与本文关联比较大的字段，其他字段不做详细阐述。 序列号：在建立连接时由计算机生成的随机数作为其初始值，通过 SYN 包传给接收端主机，每发送一次数据，就 「累加」一次该「数据字节数」的大小。用来解决网络包乱序问题。 确认应答号：指下一次「期望」收到的数据的序列号，发送端收到这个确认应答以后可以认为在这个序号以前的数 据都已经被正常接收。用来解决丢包的问题。 控制位： ACK：该位为 1 时，「确认应答」的字段变为有效，TCP 规定除了最初建立连接时的 SYN 包之外该位必须设 置为 1 。 RST：该位为 1 时，表示 TCP 连接中出现异常必须强制断开连接。 SYN：该位为 1 时，表示希望建立连接，并在其「序列号」的字段进行序列号初始值的设定。 FIN：该位为 1 时，表示今后不会再有数据发送，希望断开连接。当通信结束希望断开连接时，通信双方的主 机之间就可以相互交换 FIN 位为 1 的 TCP 段。 TCP三次握手过程说一下？：TCP 是面向连接的协议，所以使用 TCP 前必须先建立连接，而建立连接是通过三次握手来进行的。三次握手的过 程如下图： 一开始，客户端和服务端都处于 CLOSE 状态。先是服务端主动监听某个端口，处于 LISTEN 状态 客户端会随机初始化序号（client_isn），将此序号置于 TCP 首部的「序号」字段中，同时把 SYN 标志位置 为 1，表示 SYN 报文。接着把第一个 SYN 报文发送给服务端，表示向服务端发起连接，该报文不包含应用层 数据，之后客户端处于 SYN-SENT 状态。 服务端收到客户端的 SYN 报文后，首先服务端也随机初始化自己的序号（server_isn），将此序号填入 TCP 首部的「序号」字段中，其次把 TCP 首部的「确认应答号」字段填入 client_isn + 1, 接着把 SYN 和 ACK 标志 位置为 1。… tcp为什么需要三次握手建立连接？…",
    "keyPoints": [
      "能识别序列号、确认号、标志位、窗口等关键字段，画出 SYN、SYN-ACK、ACK 与双方状态，解释三次握手为何能确认双向收发能力并避免历史连接干扰"
    ],
    "followUps": [
      "TCP三次握手过程说一下？",
      "tcp为什么需要三次握手建立连接？"
    ],
    "tags": [
      "计算机网络",
      "TCP 头部",
      "三次握手",
      "TCP",
      "TCP 头部与三次握手"
    ],
    "sourceRef": "网络 PDF p.25-36：TCP 头部；三次握手过程；为什么需要三次；第三次确认丢失；服务端状态",
    "source": "builtin",
    "order": 50
  },
  {
    "id": "java-network-9c997d8c96",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 10,
    "question": "如何理解TCP 四次挥手与异常状态？",
    "coreAnswer": "具体过程： 客户端主动调用关闭连接的函数，于是就会发送 FIN 报文，这个 FIN 报文代表客户端不会再发送数据了，进 入 FIN_WAIT_1 状态； 服务端收到了 FIN 报文，然后马上回复一个 ACK 确认报文，此时服务端进入 CLOSE_WAIT 状态。在收到 FIN 报文的时候，TCP 协议栈会为 FIN 包插入一个文件结束符 EOF 到接收缓冲区中，服务端应用程序可以通过 read 调用来感知这个 FIN 包，这个 EOF 会被放在已排队等候的其他已接收的数据之后，所以必须要得继续 read 接收缓冲区已接收的数据；…",
    "explanation": "TCP 四次挥手过程说一下？：具体过程： 客户端主动调用关闭连接的函数，于是就会发送 FIN 报文，这个 FIN 报文代表客户端不会再发送数据了，进 入 FIN_WAIT_1 状态； 服务端收到了 FIN 报文，然后马上回复一个 ACK 确认报文，此时服务端进入 CLOSE_WAIT 状态。在收到 FIN 报文的时候，TCP 协议栈会为 FIN 包插入一个文件结束符 EOF 到接收缓冲区中，服务端应用程序可以通过 read 调用来感知这个 FIN 包，这个 EOF 会被放在已排队等候的其他已接收的数据之后，所以必须要得继续 read 接收缓冲区已接收的数据；… 第二次和第三次挥手能合并嘛：当被动关闭方在 TCP 挥手过程中，「没有数据要发送」并且「开启了 TCP 延迟确认机制」，那么第二和第三次挥 手就会合并传输，这样就出现了三次挥手。 断开连接时客户端 FIN 包丢失，服务端的状态是什么？：当客户端（主动关闭方）调用 close 函数后，就会向服务端发送 FIN 报文，试图与服务端断开连接，此时客户端的 连接进入到 FIN_WAIT_1 状态。 正常情况下，如果能及时收到服务端（被动关闭方）的 ACK，则会很快变为 FIN_WAIT2状态。 如果第一次挥手丢失了，那么客户端迟迟收不到被动方的 ACK 的话，也就会触发超时重传机制，重传 FIN 报文， 重发次数由 tcp_orphan_retries 参数控制。 当客户端重传 FIN 报文的次数超过 tcp_orphan_retries 后，就不再发送 FIN 报文，则会在等待一段时间（时间为 上一次超时时间的 2 倍），如果还是没能收到第二次挥手，那么客户端直接进入到 close 状态，而服务端还是 ESTABLISHED状态 举个例子，假设 tcp_orphan_retries 参数值为 3，当第一次挥手一直丢失时，发生的过程如下图：",
    "keyPoints": [
      " FIN、ACK、FIN、ACK 与状态迁移，解释中间两次通常分开的原因、何时可合并、半关闭阶段能做什么，并分析 FIN 丢失或对端迟迟不发 FIN 的结果"
    ],
    "followUps": [
      "第二次和第三次挥手能合并嘛？",
      "断开连接时客户端 FIN 包丢失，服务端的状态是什么？"
    ],
    "tags": [
      "计算机网络",
      "TCP 四次挥手",
      "异常状态",
      "TCP",
      "TCP 四次挥手与异常状态"
    ],
    "sourceRef": "网络 PDF p.44-47：TCP 四次挥手；中间两次能否合并；第三次挥手未发；FIN 包丢失",
    "source": "builtin",
    "order": 51
  },
  {
    "id": "java-network-cf25148294",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 10,
    "question": "TCP 可靠传输机制应该如何理解？",
    "coreAnswer": "TCP协议主要通过以下几点来保证传输可靠性：连接管理、序列号、确认应答、超时重传、流量控制、拥塞控制。 连接管理：即三次握手和四次挥手。连接管理机制能够建立起可靠的连接，这是保证传输可靠性的前提。 序列号：TCP将每个字节的数据都进行了编号，这就是序列号。序列号的具体作用如下：能够保证可靠性，既 能防止数据丢失，又能避免数据重复。能够保证有序性，按照序列号顺序进行数据包还原。能够提高效率， 基于序列号可实现多次发送，一次确认。 确认应答：接收方接收数据之后，会回传ACK报文，报文中带有此次确认的序列号，用于告知发送方此次接收 数据的情况。在指定时间后，若发送端仍未收到确认应答，就会启动超时重传。…",
    "explanation": "TCP为什么可靠传输：TCP协议主要通过以下几点来保证传输可靠性：连接管理、序列号、确认应答、超时重传、流量控制、拥塞控制。 连接管理：即三次握手和四次挥手。连接管理机制能够建立起可靠的连接，这是保证传输可靠性的前提。 序列号：TCP将每个字节的数据都进行了编号，这就是序列号。序列号的具体作用如下：能够保证可靠性，既 能防止数据丢失，又能避免数据重复。能够保证有序性，按照序列号顺序进行数据包还原。能够提高效率， 基于序列号可实现多次发送，一次确认。 确认应答：接收方接收数据之后，会回传ACK报文，报文中带有此次确认的序列号，用于告知发送方此次接收 数据的情况。在指定时间后，若发送端仍未收到确认应答，就会启动超时重传。 超时重传：超时重传主要有两种场景：数据包丢失：在指定时间后，若发送端仍未收到确认应答，就会启动 超时重传，向接收端重新发送数据包。确认包丢失：当接收端收到重复数据(通过序列号进行识别)时将其丢 弃，并重新回传ACK报文。…",
    "keyPoints": [
      "序列号与确认、校验、超时和快速重传、乱序重组、滑动窗口说明可靠性，区分“可靠交付”与应用业务恰好一次语义"
    ],
    "followUps": [
      "序列号与确认、校验、超时和快速重传、乱序重组、滑动窗口说明可靠性，区分“可靠交付”与应用业务恰好一次语义？"
    ],
    "tags": [
      "计算机网络",
      "TCP 可靠传输机制",
      "TCP"
    ],
    "sourceRef": "网络 PDF p.54-55：TCP 为什么可靠传输",
    "source": "builtin",
    "order": 52
  },
  {
    "id": "java-network-02581cf274",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "S",
    "score": 9,
    "question": "如何理解TCP 流量控制与拥塞控制？",
    "coreAnswer": "一般来说，计算机网络都处在一个共享的环境。因此也有可能会因为其他主机之间的通信使得网络拥堵。 在网络出现拥堵时，如果继续发送大量数据包，可能会导致数据包时延、丢失等，这时 TCP 就会重传数据，但是 一重传就会导致网络的负担更重，于是会导致更大的延迟以及更多的丢包，这个情况就会进入恶性循环被不断地放 大.... 所以，TCP 不能忽略网络上发生的事，它被设计成一个无私的协议，当网络发送拥塞时，TCP 会自我牺牲，降低发 送的数据量。 于是，就有了拥塞控制，控制的目的就是避免「发送方」的数据填满整个网络。 为了在「发送方」调节所要发送数据的量，定义了一个叫做「拥塞窗口」的概念。…",
    "explanation": "TCP的拥塞控制介绍一下？：一般来说，计算机网络都处在一个共享的环境。因此也有可能会因为其他主机之间的通信使得网络拥堵。 在网络出现拥堵时，如果继续发送大量数据包，可能会导致数据包时延、丢失等，这时 TCP 就会重传数据，但是 一重传就会导致网络的负担更重，于是会导致更大的延迟以及更多的丢包，这个情况就会进入恶性循环被不断地放 大.... 所以，TCP 不能忽略网络上发生的事，它被设计成一个无私的协议，当网络发送拥塞时，TCP 会自我牺牲，降低发 送的数据量。 于是，就有了拥塞控制，控制的目的就是避免「发送方」的数据填满整个网络。 为了在「发送方」调节所要发送数据的量，定义了一个叫做「拥塞窗口」的概念。 拥塞窗口 cwnd是发送方维护的一个的状态变量，它会根据网络的拥塞程度动态变化的。…",
    "keyPoints": [
      "接收端流量控制与网络拥塞控制，说明接收窗口、拥塞窗口、慢启动、拥塞避免、快速重传和快速恢复，知道发送窗口受两者共同约束"
    ],
    "followUps": [
      "接收端流量控制与网络拥塞控制，说明接收窗口、拥塞窗口、慢启动、拥塞避免、快速重传和快速恢复，知道发送窗口受两者共同约束？"
    ],
    "tags": [
      "计算机网络",
      "TCP 流量控制",
      "拥塞控制",
      "TCP",
      "TCP 流量控制与拥塞控制"
    ],
    "sourceRef": "网络 PDF p.56-60：TCP 的拥塞控制",
    "source": "builtin",
    "order": 53
  },
  {
    "id": "java-os-5f72aa1b37",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 9,
    "question": "用户态、内核态与系统调用边界应该如何理解？",
    "coreAnswer": "内核态和用户态是操作系统中的两种运行模式。它们的主要区别在于权限和可执行的操作： 内核态（Kernel Mode）：在内核态下，CPU可以执行所有的指令和访问所有的硬件资源。这种模式下的操作 具有更高的权限，主要用于操作系统内核的运行。 用户态（User Mode）：在用户态下，CPU只能执行部分指令集，无法直接访问硬件资源。这种模式下的操 作权限较低，主要用于运行用户程序。 内核态的底层操作主要包括：内存管理、进程管理、设备驱动程序控制、系统调用等。这些操作涉及到操作系统的 核心功能，需要较高的权限来执行。…",
    "explanation": "用户态和内核态的区别？：内核态和用户态是操作系统中的两种运行模式。它们的主要区别在于权限和可执行的操作： 内核态（Kernel Mode）：在内核态下，CPU可以执行所有的指令和访问所有的硬件资源。这种模式下的操作 具有更高的权限，主要用于操作系统内核的运行。 用户态（User Mode）：在用户态下，CPU只能执行部分指令集，无法直接访问硬件资源。这种模式下的操 作权限较低，主要用于运行用户程序。 内核态的底层操作主要包括：内存管理、进程管理、设备驱动程序控制、系统调用等。这些操作涉及到操作系统的 核心功能，需要较高的权限来执行。 分为内核态和用户态的原因主要有以下几点： 安全性：通过对权限的划分，用户程序无法直接访问硬件资源，从而避免了恶意程序对系统资源的破坏。 稳定性：用户态程序出现问题时，不会影响到整个系统，避免了程序故障导致系统崩溃的风险。 隔离性：内核态和用户态的划分使得操作系统内核与用户程序之间有了明确的边界，有利于系统的模块化和 维护。…",
    "keyPoints": [
      "两种运行级别的权限差异、为什么需要隔离，以及系统调用、异常和中断使 CPU 进入内核态的边界",
      "不把普通函数调用等同于系统调用"
    ],
    "followUps": [
      "两种运行级别的权限差异、为什么需要隔离，以及系统调用、异常和中断使 CPU 进入内核态的边界？",
      "不把普通函数调用等同于系统调用？"
    ],
    "tags": [
      "操作系统",
      "用户态",
      "内核态",
      "系统调用边界",
      "用户态、内核态与系统调用边界"
    ],
    "sourceRef": "操作系统 PDF p.1：用户态和内核态的区别",
    "source": "builtin",
    "order": 54
  },
  {
    "id": "java-os-06ce4e140f",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 10,
    "question": "如何理解进程、线程与协程？",
    "coreAnswer": "本质区别：进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位 在开销方面：每个进程都有独立的代码和数据空间（程序上下文），程序之间的切换会有较大的开销；线程 可以看做轻量级的进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器 （PC），线程之间切换的开销小 稳定性方面：进程中某个线程如果崩溃了，可能会导致整个进程都崩溃。而进程中的子进程崩溃，并不会影 响其他进程。 内存分配方面：系统在运行的时候会为每个进程分配不同的内存空间；…",
    "explanation": "线程和进程的区别是什么？：本质区别：进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位 在开销方面：每个进程都有独立的代码和数据空间（程序上下文），程序之间的切换会有较大的开销；线程 可以看做轻量级的进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器 （PC），线程之间切换的开销小 稳定性方面：进程中某个线程如果崩溃了，可能会导致整个进程都崩溃。而进程中的子进程崩溃，并不会影 响其他进程。 内存分配方面：系统在运行的时候会为每个进程分配不同的内存空间；而对线程而言，除了CPU外，系统不 会为线程分配内存（线程所使用的资源来自其所属进程的资源），线程组之间只能共享资源 包含关系：没有线程的进程可以看做是单线程的，如果一个进程内有多个线程，则执行过程不是一条线的， 而是多条线 进程，线程，协程的区别是什么？：首先，我们来谈谈进程。进程是操作系统中进行资源分配和调度的基本单位，它拥有自己的独立内存空间和 系统资源。每个进程都有独立的堆和栈，不与其他进程共享。进程间通信需要通过特定的机制，如管道、消 息队列、信号量等。由于进程拥有独立的内存空间，因此其稳定性和安全性相对较高，但同时上下文切换的 开销也较大，因为需要保存和恢复整个进程的状态。 接下来是线程。线程是进程内的一个执行单元，也是CPU调度和分派的基本单位。与进程不同，线程共享进 程的内存空间，包括堆和全局变量。线程之间通信更加高效，因为它们可以直接读写共享内存。线程的上下 文切换开销较小，因为只需要保存和恢复线程的上下文，而不是整个进程的状态。然而，由于多个线程共享 内存空间，因此存在数据竞争和线程安全的问题，需要通过同步和互斥机制来解决。 最后是协程。协程是一种用户态的轻量级线程，其调度完全由用户程序控制，而不需要内核的参与。… 讲下为什么进程之下还要设计线程？：我们举个例子，假设你要编写一个视频播放器软件，那么该软件功能的核心模块有三个： 从视频文件当中读取数据； 对读取的数据进行解压缩； 把解压缩后的视频数据播放出来； 对于单进程的实现方式，我想大家都会是以下这个方式： 对于单进程的这种方式，存在以下问题： 播放出来的画面和声音会不连贯，因为当 CPU 能力不够强的时候，Read 的时候可能进程就等在这了，这样 就会导致等半天才进行数据解压和播放； 各个函数之间不是并发执行，影响资源的使用效率； 那改进成多进程的方式： 对于多进程的这种方式，依然会存在问题：",
    "keyPoints": [
      "资源拥有者、CPU 调度单位、地址空间、栈与寄存器、通信方式和调度主体比较三者",
      "明确同进程线程共享堆和地址空间但各有栈与执行上下文，协程通常由用户态运行时调度"
    ],
    "followUps": [
      "进程，线程，协程的区别是什么？",
      "讲下为什么进程之下还要设计线程？"
    ],
    "tags": [
      "操作系统",
      "进程",
      "线程",
      "协程",
      "进程、线程与协程"
    ],
    "sourceRef": "操作系统 PDF p.1-3：线程和进程的区别；进程、线程、协程的区别；为什么进程之下还要设计线程",
    "source": "builtin",
    "order": 55
  },
  {
    "id": "java-os-f4096c7280",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 10,
    "question": "线程同步与通信机制应该如何理解？",
    "coreAnswer": "Linux系统提供了五种用于线程通信的方式：互斥锁、读写锁、条件变量、自旋锁和信号量。 互斥锁（Mutex）：互斥量(mutex)从本质上说是一把锁，在访问共享资源前对互斥量进行加锁，在访问完成 后释放互斥量上的锁。对互斥量进行加锁以后，任何其他试图再次对互斥锁加锁的线程将会阻塞直到当前线 程释放该互斥锁。如果释放互斥锁时有多个线程阻塞，所有在该互斥锁上的阻塞线程都会变成可运行状态， 第一个变为运行状态的线程可以对互斥锁加锁，其他线程将会看到互斥锁依然被锁住，只能回去再次等待它 重新变为可用。 条件变量（Condition Variables）：条件变量(cond)是在多线程程序中用来实现\"等待--》唤醒\"逻辑常用的 方法。…",
    "explanation": "线程间通讯有什么方式？：Linux系统提供了五种用于线程通信的方式：互斥锁、读写锁、条件变量、自旋锁和信号量。 互斥锁（Mutex）：互斥量(mutex)从本质上说是一把锁，在访问共享资源前对互斥量进行加锁，在访问完成 后释放互斥量上的锁。对互斥量进行加锁以后，任何其他试图再次对互斥锁加锁的线程将会阻塞直到当前线 程释放该互斥锁。如果释放互斥锁时有多个线程阻塞，所有在该互斥锁上的阻塞线程都会变成可运行状态， 第一个变为运行状态的线程可以对互斥锁加锁，其他线程将会看到互斥锁依然被锁住，只能回去再次等待它 重新变为可用。 条件变量（Condition Variables）：条件变量(cond)是在多线程程序中用来实现\"等待--》唤醒\"逻辑常用的 方法。条件变量利用线程间共享的全局变量进行同步的一种机制，主要包括两个动作：一个线程等待\"条件变 量的条件成立\"而挂起；另一个线程使“条件成立”。为了防止竞争，条件变量的使用总是和一个互斥锁结合在 一起。…",
    "keyPoints": [
      "能围绕互斥锁、读写锁、条件变量、自旋锁和信号量说明互斥、同步、等待唤醒与资源计数的差异，给出读多写少、临界区极短等适用边界"
    ],
    "followUps": [
      "能围绕互斥锁、读写锁、条件变量、自旋锁和信号量说明互斥、同步、等待唤醒与资源计数的差异，给出读多写少、临界区极短等适用边界？"
    ],
    "tags": [
      "操作系统",
      "线程同步",
      "通信机制",
      "线程同步与通信机制"
    ],
    "sourceRef": "操作系统 PDF p.10-11：线程间通信有什么方式",
    "source": "builtin",
    "order": 56
  },
  {
    "id": "java-os-4e888613a3",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 10,
    "question": "如何理解死锁条件、预防与处理？",
    "coreAnswer": "死锁只有同时满足以下四个条件才会发生： 互斥条件：互斥条件是指多个线程不能同时使用同一个资源。 持有并等待条件：持有并等待条件是指，当线程 A 已经持有了资源 1，又想申请资源 2，而资源 2 已经被线程 C 持有了，所以线程 A 就会处于等待状态，但是线程 A 在等待资源 2 的同时并不会释放自己已经持有的资源 1。 不可剥夺条件：不可剥夺条件是指，当线程已经持有了资源 ，在自己使用完之前不能被其他线程获取，线程 B 如果也想使用此资源，则只能在线程 A 使用完并释放后才能获取。 环路等待条件：环路等待条件指的是，在死锁发生的时候，两个线程获取资源的顺序构成了环形链。…",
    "explanation": "死锁发生条件是什么？：死锁只有同时满足以下四个条件才会发生： 互斥条件：互斥条件是指多个线程不能同时使用同一个资源。 持有并等待条件：持有并等待条件是指，当线程 A 已经持有了资源 1，又想申请资源 2，而资源 2 已经被线程 C 持有了，所以线程 A 就会处于等待状态，但是线程 A 在等待资源 2 的同时并不会释放自己已经持有的资源 1。 不可剥夺条件：不可剥夺条件是指，当线程已经持有了资源 ，在自己使用完之前不能被其他线程获取，线程 B 如果也想使用此资源，则只能在线程 A 使用完并释放后才能获取。 环路等待条件：环路等待条件指的是，在死锁发生的时候，两个线程获取资源的顺序构成了环形链。 如何避免死锁？：避免死锁问题就只需要破环其中一个条件就可以，最常见的并且可行的就是使用资源有序分配法，来破环环路等待 条件。 那什么是资源有序分配法呢？线程 A 和 线程 B 获取资源的顺序要一样，当线程 A 是先尝试获取资源 A，然后尝试 获取资源 B 的时候，线程 B 同样也是先尝试获取资源 A，然后尝试获取资源 B。也就是说，线程 A 和 线程 B 总是 以相同的顺序申请自己想要的资源。",
    "keyPoints": [
      "能准确说出互斥、请求并保持、不可剥夺、循环等待四个必要条件，并从破坏条件、固定加锁顺序、超时回退、检测恢复说明治理",
      "等待图直接判定主要适用于每类资源单实例，多实例资源需使用更一般的死锁检测算法"
    ],
    "followUps": [
      "如何避免死锁？"
    ],
    "tags": [
      "操作系统",
      "死锁条件",
      "预防",
      "处理",
      "死锁条件、预防与处理"
    ],
    "sourceRef": "操作系统 PDF p.15-16：死锁发生条件；如何避免死锁",
    "source": "builtin",
    "order": 57
  },
  {
    "id": "java-os-a3931f387e",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 9,
    "question": "如何理解操作系统内存管理与虚拟内存？",
    "coreAnswer": "操作系统设计了虚拟内存，每个进程都有自己的独立的虚拟内存，我们所写的程序不会直接与物理内打交道。 有了虚拟内存之后，它带来了这些好处： 第一，虚拟内存可以使得进程对运行内存超过物理内存大小，因为程序运行符合局部性原理，CPU 访问内存 会有很明显的重复访问的倾向性，对于那些没有被经常使用到的内存，我们可以把它换出到物理内存之外， 比如硬盘上的 swap 区域。 第二，由于每个进程都有自己的页表，所以每个进程的虚拟内存空间就是相互独立的。进程也没有办法访问 其他进程的页表，所以这些页表是私有的，这就解决了多进程之间地址冲突的问题。…",
    "explanation": "介绍一下操作系统内存管理：操作系统设计了虚拟内存，每个进程都有自己的独立的虚拟内存，我们所写的程序不会直接与物理内打交道。 有了虚拟内存之后，它带来了这些好处： 第一，虚拟内存可以使得进程对运行内存超过物理内存大小，因为程序运行符合局部性原理，CPU 访问内存 会有很明显的重复访问的倾向性，对于那些没有被经常使用到的内存，我们可以把它换出到物理内存之外， 比如硬盘上的 swap 区域。 第二，由于每个进程都有自己的页表，所以每个进程的虚拟内存空间就是相互独立的。进程也没有办法访问 其他进程的页表，所以这些页表是私有的，这就解决了多进程之间地址冲突的问题。 第三，页表里的页表项中除了物理地址之外，还有一些标记属性的比特，比如控制一个页的读写权限，标记 该页是否存在等。在内存访问方面，操作系统提供了更好的安全性。 Linux 是通过对内存分页的方式来管理内存，分页是把整个虚拟和物理内存空间切成一段段固定尺寸的大小。… 什么是虚拟内存和物理内存？：虚拟内存：是操作系统提供给每个运行中程序的一种地址空间，每个程序在运行时认为自己拥有的内存空间 就是虚拟内存，其大小可以远远大于物理内存的大小。虚拟内存通过将程序的地址空间划分成若干个固定大 小的页或段，并将这些页或者段映射到物理内存中的不同位置，从而使得程序在运行时可以更高效地利用物 理内存。 物理内存：物理内存是计算机实际存在的内存，是计算机中的实际硬件部件。",
    "keyPoints": [
      "物理内存与每进程虚拟地址空间的关系，概括分段、分页、换入换出与内存映射的职责，解释虚拟内存带来的隔离、连续地址抽象和超额使用边界"
    ],
    "followUps": [
      "什么是虚拟内存和物理内存？"
    ],
    "tags": [
      "操作系统",
      "操作系统内存管理",
      "虚拟内存",
      "操作系统内存管理与虚拟内存"
    ],
    "sourceRef": "操作系统 PDF p.19-21：操作系统内存管理；虚拟内存和物理内存",
    "source": "builtin",
    "order": 58
  },
  {
    "id": "java-os-cd2a8dd943",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 10,
    "question": "如何理解分页、页表、TLB 与地址转换？",
    "coreAnswer": "分页是把整个虚拟和物理内存空间切成一段段固定尺寸的大小。这样一个连续并且尺寸固定的内存空间，我们叫页 （Page）。在 Linux 下，每一页的大小为 4KB。 虚拟地址与物理地址之间通过页表来映射，如下图： 页表是存储在内存里的，内存管理单元 （MMU）就做将虚拟内存地址转换成物理地址的工作。 而当进程访问的虚拟地址在页表中查不到时，系统会产生一个缺页异常，进入系统内核空间分配物理内存、更新进 程页表，最后再返回用户空间，恢复进程的运行。 内存分页由于内存空间都是预先划分好的，也就不会像内存分段一样，在段与段之间会产生间隙非常小的内存，这 正是分段会产生外部内存碎片的原因。而采用了分页，页与页之间是紧密排列的，所以不会有外部碎片。…",
    "explanation": "讲一下页表？：分页是把整个虚拟和物理内存空间切成一段段固定尺寸的大小。这样一个连续并且尺寸固定的内存空间，我们叫页 （Page）。在 Linux 下，每一页的大小为 4KB。 虚拟地址与物理地址之间通过页表来映射，如下图： 页表是存储在内存里的，内存管理单元 （MMU）就做将虚拟内存地址转换成物理地址的工作。 而当进程访问的虚拟地址在页表中查不到时，系统会产生一个缺页异常，进入系统内核空间分配物理内存、更新进 程页表，最后再返回用户空间，恢复进程的运行。 内存分页由于内存空间都是预先划分好的，也就不会像内存分段一样，在段与段之间会产生间隙非常小的内存，这 正是分段会产生外部内存碎片的原因。而采用了分页，页与页之间是紧密排列的，所以不会有外部碎片。 但是，因为内存分页机制分配内存的最小单位是一页，即使程序不足一页大小，我们最少只能分配一个页，所以页 内会出现内存浪费，所以针对内存分页机制会有内部内存碎片的现象。… 虚拟地址是怎么转化到物理地址的？：虚拟地址转化为物理地址是通过内存管理单元（Memory Management Unit，MMU）来完成的。MMU是计算机 系统中的硬件组件，负责虚拟地址和物理地址之间的转换。 在虚拟地址转换的过程中，通常会使用页表（Page Table）来进行映射。页表是一种数据结构，它将虚拟地址空间 划分为固定大小的页（Page），对应于物理内存中的页框（Page Frame）。每个页表项（Page Table Entry）记 录了虚拟页和物理页的对应关系。 当程序访问一个虚拟地址时，MMU会将虚拟地址分解为页号和页内偏移量。然后，MMU会查找页表，根据页号找 到对应的页表项。页表项中包含了物理页的地址或页框号。最后，MMU将物理页的地址与页内偏移量组合，得到 对应的物理地址。 虚拟地址转化为物理地址的过程中，还可能涉及到多级页表、TLB（Translation Lookaside Buﬀer）缓存等机制， 以提高地址转换的效率。",
    "keyPoints": [
      "能按虚拟页号与页内偏移、TLB、页表、物理页框口述转换路径，说明多级页表的空间取舍",
      " TLB 未命中与缺页异常，能说明缺页进入内核、装页或分配、更新页表后重试"
    ],
    "followUps": [
      "虚拟地址是怎么转化到物理地址的？"
    ],
    "tags": [
      "操作系统",
      "分页",
      "页表",
      "TLB 与地址转换",
      "TLB",
      "分页、页表、TLB 与地址转换"
    ],
    "sourceRef": "操作系统 PDF p.21-23、p.25-26：讲一下页表；虚拟地址怎么转化为物理地址",
    "source": "builtin",
    "order": 59
  },
  {
    "id": "java-os-1727b80fc6",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "S",
    "score": 10,
    "question": "如何理解select、poll 与 epoll 多路复用？",
    "coreAnswer": "IO多路复用是一种IO得处理方式，指的是复用一个线程，处理多个socket中的事件。能够资源复用，防止创建过多 线程导致的上下文切换的开销。 我们熟悉的 select/poll/epoll 内核提供给用户态的多路复用系统调用，进程可以通过一个系统调用函数从内核中获 取多个事件。 select/poll/epoll 是如何获取网络事件的呢？在获取事件时，先把所有连接（文件描述符）传给内核，再由内核返 回产生了事件的连接，然后在用户态中再处理这些连接对应的请求即可。 select/poll/epoll 这是三个多路复用接口，都能实现 C10K 吗？接下来，我们分别说说它们。…",
    "explanation": "讲一下io多路复用：IO多路复用是一种IO得处理方式，指的是复用一个线程，处理多个socket中的事件。能够资源复用，防止创建过多 线程导致的上下文切换的开销。 select、poll、epoll 的区别是什么？：我们熟悉的 select/poll/epoll 内核提供给用户态的多路复用系统调用，进程可以通过一个系统调用函数从内核中获 取多个事件。 select/poll/epoll 是如何获取网络事件的呢？在获取事件时，先把所有连接（文件描述符）传给内核，再由内核返 回产生了事件的连接，然后在用户态中再处理这些连接对应的请求即可。 select/poll/epoll 这是三个多路复用接口，都能实现 C10K 吗？接下来，我们分别说说它们。… epoll 的 边缘触发和水平触发有什么区别？：epoll 支持两种事件触发模式，分别是边缘触发（edge-triggered，ET）和水平触发（level-triggered，LT）。 这两个术语还挺抽象的，其实它们的区别还是很好理解的。 使用边缘触发模式时，当被监控的 Socket 描述符上有可读事件发生时，服务器端只会从 epoll_wait 中苏醒 一次，即使进程没有调用 read 函数从内核读取数据，也依然只苏醒一次，因此我们程序要保证一次性将内核 缓冲区的数据读取完； 使用水平触发模式时，当被监控的 Socket 上有可读事件发生时，服务器端不断地从 epoll_wait 中苏醒，直 到内核缓冲区数据被 read 函数读完才结束，目的是告诉我们有数据需要读取； 举个例子，你的快递被放到了一个快递箱里，如果快递箱只会通过短信通知你一次，即使你一直没有去取，它也不 会再发送第二条短信提醒你，这个方式就是边缘触发；…",
    "keyPoints": [
      "监听集合表示、每次调用拷贝与扫描、就绪通知和连接数量限制，说明 epoll 的注册与就绪队列",
      "水平触发和边缘触发，并说明边缘触发通常需非阻塞读到暂不可读"
    ],
    "followUps": [
      "select、poll、epoll 的区别是什么？",
      "epoll 的 边缘触发和水平触发有什么区别？"
    ],
    "tags": [
      "操作系统",
      "select",
      "poll",
      "epoll 多路复用",
      "epoll",
      "select、poll 与 epoll 多路复用"
    ],
    "sourceRef": "操作系统 PDF p.38-40：I/O 多路复用；select、poll、epoll 区别；epoll 边缘触发和水平触发",
    "source": "builtin",
    "order": 60
  },
  {
    "id": "java-dsa-ffcad840da",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 10,
    "question": "复杂度分析与数据结构选型是什么？",
    "coreAnswer": "数组：数组的内存空间是连续的，随机访问的时间复杂度是O1，适用于需要按索引访问元素的",
    "explanation": "了解哪些数据结构？：数组：数组的内存空间是连续的，随机访问的时间复杂度是O1，适用于需要按索引访问元素的",
    "keyPoints": [
      "输入规模、基本操作次数和额外存储判断常见时间与空间复杂度，区分最好、平均、最坏和均摊复杂度",
      "能按访问、插入、删除、顺序性和内存局部性选择结构，不把常数时间理解成绝对零成本"
    ],
    "followUps": [
      "输入规模、基本操作次数和额外存储判断常见时间与空间复杂度，区分最好、平均、最坏和均摊复杂度？",
      "能按访问、插入、删除、顺序性和内存局部性选择结构，不把常数时间理解成绝对零成本？"
    ],
    "tags": [
      "数据结构与算法",
      "复杂度分析",
      "数据结构选型",
      "复杂度分析与数据结构选型"
    ],
    "sourceRef": "数据结构与算法 PDF p.1：了解哪些数据结构",
    "source": "builtin",
    "order": 61
  },
  {
    "id": "java-dsa-dd70be0d63",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 9,
    "question": "如何理解数组与链表？",
    "coreAnswer": "访问效率：数组可以通过索引直接访问任何位置的元素，访问效率高，时间复杂度为O(1)，而 链表需要从头节点开始遍历到目标位置，访问效率较低，时间复杂度为O(n)。 插入和删除操作效率：数组插入和删除操作可能需要移动其他元素，时间复杂度为O(n)，而链 表只需要修改指针指向，时间复杂度为O(1)。 缓存命中率：由于数组元素在内存中连续存储，可以提高CPU缓存的命中率，而链表节点不 连续存储，可能导致CPU缓存的命中率较低，频繁的缓存失效会影响性能。 应用场景：数组适合静态大小、频繁访问元素的场景，而链表适合动态大小、频繁插入、删除 操作的场景 数组必须要内存中一块连续的空间，并且数组中必须存放相同的数据类型。…",
    "explanation": "数组和链表区别是什么？：访问效率：数组可以通过索引直接访问任何位置的元素，访问效率高，时间复杂度为O(1)，而 链表需要从头节点开始遍历到目标位置，访问效率较低，时间复杂度为O(n)。 插入和删除操作效率：数组插入和删除操作可能需要移动其他元素，时间复杂度为O(n)，而链 表只需要修改指针指向，时间复杂度为O(1)。 缓存命中率：由于数组元素在内存中连续存储，可以提高CPU缓存的命中率，而链表节点不 连续存储，可能导致CPU缓存的命中率较低，频繁的缓存失效会影响性能。 应用场景：数组适合静态大小、频繁访问元素的场景，而链表适合动态大小、频繁插入、删除 操作的场景 为什么数组查询的复杂度为O(1)？：数组必须要内存中一块连续的空间，并且数组中必须存放相同的数据类型。 比如我们创建一个长度为 10，数据类型为整型的数组，在内存中的地址是从 1000 开始，那么它 在内存中的存储格式如下。 由于每个整型数据占据 4 个字节的内存空间，因此整个数组的内存空间地址是 1000～1039，根据 这个，我们就可以轻易算出数组中每个数据的内存下标地址。 利用这个特性，我们只要知道了数组下标，也就是数据在数组中的位置，比如下标 2，就可以计算",
    "keyPoints": [
      "连续内存、随机访问、按位置插删、扩容和 CPU 缓存局部性，准确说明复杂度成立的前提",
      "能写单链表遍历、插入、删除与反转的核心指针模板，不要求背所有链表题"
    ],
    "followUps": [
      "为什么数组查询的复杂度为O(1)？"
    ],
    "tags": [
      "数据结构与算法",
      "数组",
      "链表",
      "数组与链表"
    ],
    "sourceRef": "数据结构与算法 PDF p.1-2：数组和链表区别；p.2-4：为什么数组查询复杂度为 O(1)",
    "source": "builtin",
    "order": 62
  },
  {
    "id": "java-dsa-1a99f85d19",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 9,
    "question": "如何理解栈、队列与双栈实现队列？",
    "coreAnswer": "主要区别在于元素的插入和删除方式以及元素的访问顺序。 插入和删除方式： 队列：队列采用先进先出（FIFO）的方式，即新元素插入队尾，删除操作发生在队首。 栈：栈采用后进先出（LIFO）的方式，即新元素插入栈顶，删除操作也发生在栈顶。 元素的访问顺序： 队列：队列的元素按照插入的顺序进行访问，先插入的元素先被访问到。 栈：栈的元素按照插入的顺序进行访问，但是最后插入的元素先被访问到。 队列适用于需要按照插入顺序进行处理的场景，例如任务调度； 而栈适用于需要维护最近操作状态的场景，例如函数调用。 使用两个栈实现队列的方法如下： 1. 准备两个栈，分别称为 stackPush 和 stackPop 。…",
    "explanation": "说一下队列和栈的区别：主要区别在于元素的插入和删除方式以及元素的访问顺序。 插入和删除方式： 队列：队列采用先进先出（FIFO）的方式，即新元素插入队尾，删除操作发生在队首。 栈：栈采用后进先出（LIFO）的方式，即新元素插入栈顶，删除操作也发生在栈顶。 元素的访问顺序： 队列：队列的元素按照插入的顺序进行访问，先插入的元素先被访问到。 栈：栈的元素按照插入的顺序进行访问，但是最后插入的元素先被访问到。 队列适用于需要按照插入顺序进行处理的场景，例如任务调度； 而栈适用于需要维护最近操作状态的场景，例如函数调用。 如何使用两个栈实现队列？：使用两个栈实现队列的方法如下： 1. 准备两个栈，分别称为 stackPush 和 stackPop 。 2. 当需要入队时，将元素压入 stackPush 栈。 3. 当需要出队时，先判断 stackPop 是否为空，如果不为空，则直接弹出栈顶元素；如果为空，则 将 stackPush 中的所有元素依次弹出并压入 stackPop 中，然后再从 stackPop 中弹出栈顶元素 作为出队元素。 4. 当需要查询队首元素时，同样需要先将 stackPush 中的元素转移到 stackPop 中，然后取出 stackPop 的栈顶元素但不弹出。 5. 通过上述方法，可以实现用两个栈来模拟队列的先进先出（FIFO）特性。 这种方法的时间复杂度为O(1)的入队操作，均摊时间复杂度为O(1)的出队和查询队首元素操作。…",
    "keyPoints": [
      " LIFO、FIFO、操作端和典型场景区分栈与队列",
      "能写双栈队列的入队、出队、查看队首和判空模板，并说明元素只在必要时转移以及均摊 O(1) 的依据"
    ],
    "followUps": [
      "如何使用两个栈实现队列？"
    ],
    "tags": [
      "数据结构与算法",
      "队列",
      "双栈实现队列",
      "栈、队列与双栈实现队列"
    ],
    "sourceRef": "数据结构与算法 PDF p.4-5：队列和栈的区别；p.5-7：如何使用两个栈实现队列",
    "source": "builtin",
    "order": 63
  },
  {
    "id": "java-dsa-0d3972493b",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 9,
    "question": "如何理解二叉树遍历、BST 与退化？",
    "coreAnswer": "当每次插入的元素都是二叉查找树中最大的元素，二叉查找树就会退化成了一条链表，查找数据 的时间复杂度变成了 O(n)，如下动图演示： 二叉查找树由于存在退化成链表的可能性，会使得查询操作的时间复杂度从 O(logn) 升为 O(n)。 为了解决二叉查找树会在极端情况下退化成链表的问题，后面就有人提出平衡二叉查找树（AVL 树）。 主要是在二叉查找树的基础上增加了一些条件约束：每个节点的左子树和右子树的高度差不能超 过 1。也就是说节点的左子树和右子树仍然为平衡二叉树，这样查询操作的时间复杂度就会一直维 持在 O(logn) 。…",
    "explanation": "二叉树搜索最坏的时间复杂度，为什么会这样？以及用什么结果解决？：当每次插入的元素都是二叉查找树中最大的元素，二叉查找树就会退化成了一条链表，查找数据 的时间复杂度变成了 O(n)，如下动图演示： 二叉查找树由于存在退化成链表的可能性，会使得查询操作的时间复杂度从 O(logn) 升为 O(n)。 为了解决二叉查找树会在极端情况下退化成链表的问题，后面就有人提出平衡二叉查找树（AVL 树）。 主要是在二叉查找树的基础上增加了一些条件约束：每个节点的左子树和右子树的高度差不能超 过 1。也就是说节点的左子树和右子树仍然为平衡二叉树，这样查询操作的时间复杂度就会一直维 持在 O(logn) 。 下图是每次插入的元素都是平衡二叉查找树中最大的元素，可以看到，它会维持自平衡： 除了平衡二叉查找树，还有很多自平衡的二叉树，比如红黑树，它也是通过一些约束条件来达到 自平衡，不过红黑树的约束条件比较复杂。下面是红黑树插入节点的过程，这左旋右旋的操作， 就是为了自平衡。",
    "keyPoints": [
      "能写前序、中序、后序递归遍历和层序 BFS 核心模板，说明 BST 的有序性、中序有序和操作复杂度取决于树高",
      "有序插入为何可能退化为链表并使操作变为 O(n)，不要求首轮把所有遍历都写成迭代版"
    ],
    "followUps": [
      "能写前序、中序、后序递归遍历和层序 BFS 核心模板，说明 BST 的有序性、中序有序和操作复杂度取决于树高？",
      "有序插入为何可能退化为链表并使操作变为 O(n)，不要求首轮把所有遍历都写成迭代版？"
    ],
    "tags": [
      "数据结构与算法",
      "二叉树遍历",
      "BST 与退化",
      "BST",
      "二叉树遍历、BST 与退化"
    ],
    "sourceRef": "数据结构与算法 PDF p.12：二叉树搜索最坏时间复杂度、原因及解决结构；校招树遍历手写场景补充",
    "source": "builtin",
    "order": 64
  },
  {
    "id": "java-dsa-d433108543",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 8,
    "question": "如何理解堆与优先队列？",
    "coreAnswer": "堆是一颗完全二叉树，这样实现的堆也被称为二叉堆。堆中节点的值都大于等于（或小于等于） 其子节点的值，堆中如果节点的值都大于等于其子节点的值，我们把它称为大顶堆，如果都小于 等于其子节点的值，我们将其称为小顶堆。 下图中，1，2 是大顶堆，3 是小顶堆， 4 不是堆（不是完全二叉树）",
    "explanation": "堆是什么？：堆是一颗完全二叉树，这样实现的堆也被称为二叉堆。堆中节点的值都大于等于（或小于等于） 其子节点的值，堆中如果节点的值都大于等于其子节点的值，我们把它称为大顶堆，如果都小于 等于其子节点的值，我们将其称为小顶堆。 下图中，1，2 是大顶堆，3 是小顶堆， 4 不是堆（不是完全二叉树）",
    "keyPoints": [
      "完全二叉树与堆序性质，区分大顶堆、小顶堆",
      "能根据数组下标定位父子节点，分析查看堆顶、插入和删除堆顶复杂度，并说明优先队列、TopK 的适用场景"
    ],
    "followUps": [
      "完全二叉树与堆序性质，区分大顶堆、小顶堆？",
      "能根据数组下标定位父子节点，分析查看堆顶、插入和删除堆顶复杂度，并说明优先队列、TopK 的适用场景？"
    ],
    "tags": [
      "数据结构与算法",
      "优先队列",
      "堆与优先队列"
    ],
    "sourceRef": "数据结构与算法 PDF p.14：堆是什么",
    "source": "builtin",
    "order": 65
  },
  {
    "id": "java-dsa-03003967fd",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 10,
    "question": "排序算法复杂度、稳定性与选型是什么？",
    "coreAnswer": "冒泡排序：通过相邻元素的比较和交换，每次将最大（或最小）的元素逐步“冒泡”到最后（或 最前）。时间复杂度：最好情况下O(n)，最坏情况下O(n^2)，平均情况下O(n^2)。，空间复杂 度：O(1)。 插入排序：将待排序元素逐个插入到已排序序列的合适位置，形成有序序列。时间复杂度：最 好情况下O(n)，最坏情况下O(n^2)，平均情况下O(n^2)，空间复杂度：O(1)。 选择排序（Selection Sort）：通过不断选择未排序部分的最小（或最大）元素，并将其放置在 已排序部分的末尾（或开头）。时间复杂度：最好情况下O(n^2)，最坏情况下O(n^2)，平均情 况下O(n^2)，空间复杂度：O(1)。…",
    "explanation": "说几个你懂的排序算法，并说明其时间空间复杂度：冒泡排序：通过相邻元素的比较和交换，每次将最大（或最小）的元素逐步“冒泡”到最后（或 最前）。时间复杂度：最好情况下O(n)，最坏情况下O(n^2)，平均情况下O(n^2)。，空间复杂 度：O(1)。 插入排序：将待排序元素逐个插入到已排序序列的合适位置，形成有序序列。时间复杂度：最 好情况下O(n)，最坏情况下O(n^2)，平均情况下O(n^2)，空间复杂度：O(1)。 选择排序（Selection Sort）：通过不断选择未排序部分的最小（或最大）元素，并将其放置在 已排序部分的末尾（或开头）。时间复杂度：最好情况下O(n^2)，最坏情况下O(n^2)，平均情 况下O(n^2)，空间复杂度：O(1)。 快速排序（Quick Sort）：通过选择一个基准元素，将数组划分为两个子数组，使得左子数组的 元素都小于（或等于）基准元素，右子数组的元素都大于（或等于）基准元素，然后对子数组 进行递归排序。… 归并排序和快速排序的使用场景：归并排序是稳定排序算法，适合排序稳定的场景； 快速排序是不稳定排序算法，不适合排序稳定的场景，快速排序是目前基于比较的内部排序中 被认为是最好的方法，当待排序的关键字是随机分布时，快速排序的平均时间最短；",
    "keyPoints": [
      "冒泡、插入、选择、快速、归并、堆排序的最好、平均、最坏时间，额外空间、原地性和稳定性",
      "能按数据规模、有序程度、稳定性、内存和外存限制选择算法，不只背复杂度表"
    ],
    "followUps": [
      "归并排序和快速排序的使用场景？"
    ],
    "tags": [
      "数据结构与算法",
      "排序算法复杂度",
      "稳定性",
      "选型",
      "排序算法复杂度、稳定性与选型"
    ],
    "sourceRef": "数据结构与算法 PDF p.17：排序算法及时间、空间复杂度；p.24：归并排序和快速排序的使用场景",
    "source": "builtin",
    "order": 66
  },
  {
    "id": "java-dsa-8e7021c36f",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "S",
    "score": 9,
    "question": "快速排序与分区模板应该如何理解？",
    "coreAnswer": "快速排序的流程如下： 从数组中选择一个基准元素（通常是数组中间位置的元素）。 将数组分成两部分，小于基准元素的放在左边，大于基准元素的放在右边。 递归地对左右两部分进行快速排序。 快速排序的时间复杂度为O(n log n)，其中n为数组的长度。最坏情况下时间复杂度为O(n^2)，发 生在每次选择的基准元素都是最大或最小值时。平均情况下时间复杂度为O(n log n)，效率较高。",
    "explanation": "说说快排流程，时间复杂度：快速排序的流程如下： 从数组中选择一个基准元素（通常是数组中间位置的元素）。 将数组分成两部分，小于基准元素的放在左边，大于基准元素的放在右边。 递归地对左右两部分进行快速排序。 快速排序的时间复杂度为O(n log n)，其中n为数组的长度。最坏情况下时间复杂度为O(n^2)，发 生在每次选择的基准元素都是最大或最小值时。平均情况下时间复杂度为O(n log n)，效率较高。",
    "keyPoints": [
      "选基准、partition、递归子区间三步并写出一种边界一致的分区模板",
      "能分析平均 O(n log n)、最坏 O(n^2) 与递归栈空间，说明随机基准或三数取中的作用"
    ],
    "followUps": [
      "选基准、partition、递归子区间三步并写出一种边界一致的分区模板？",
      "能分析平均 O(n log n)、最坏 O(n^2) 与递归栈空间，说明随机基准或三数取中的作用？"
    ],
    "tags": [
      "数据结构与算法",
      "快速排序",
      "分区模板",
      "快速排序与分区模板"
    ],
    "sourceRef": "数据结构与算法 PDF p.19-20：快排原理与代码；p.25：快排流程、时间复杂度及最坏 O(n^2) 原因",
    "source": "builtin",
    "order": 67
  },
  {
    "id": "java-mq-0441d851d5",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "S",
    "score": 9,
    "question": "消息队列的价值与使用场景应该如何理解？",
    "coreAnswer": "你可以把消息队列理解为一个使用队列来通信的组件。它的本质，就是个转发器，包含发消息、存消息、消费消息 的过程。最简单的消息队列模型如下： 我们通常说的消息队列，简称MQ（Message Queue），它其实就指消息中间件，当前业界比较流行的开源消息 中间件包括： RabbitMQ、RocketMQ、Kafka 。 解耦：可以在多个系统之间进行解耦，将原本通过网络之间的调用的方式改为使用MQ进行消息的异步通讯， 只要该操作不是需要同步的，就可以改为使用MQ进行不同系统之间的联系，这样项目之间不会存在耦合，系 统之间不会产生太大的影响，就算一个系统挂了，也只是消息挤压在MQ里面没人进行消费而已，不会对其他 的系统产生影响。…",
    "explanation": "什么是消息队列？：你可以把消息队列理解为一个使用队列来通信的组件。它的本质，就是个转发器，包含发消息、存消息、消费消息 的过程。最简单的消息队列模型如下： 我们通常说的消息队列，简称MQ（Message Queue），它其实就指消息中间件，当前业界比较流行的开源消息 中间件包括： RabbitMQ、RocketMQ、Kafka 。 消息队列使用场景有哪些？：解耦：可以在多个系统之间进行解耦，将原本通过网络之间的调用的方式改为使用MQ进行消息的异步通讯， 只要该操作不是需要同步的，就可以改为使用MQ进行不同系统之间的联系，这样项目之间不会存在耦合，系 统之间不会产生太大的影响，就算一个系统挂了，也只是消息挤压在MQ里面没人进行消费而已，不会对其他 的系统产生影响。 异步：加入一个操作设计到好几个步骤，这些步骤之间不需要同步完成，比如客户去创建了一个订单，还要 去客户轨迹系统添加一条轨迹、去库存系统更新库存、去客户系统修改客户的状态等等。这样如果这个系统 都直接进行调用，那么将会产生大量的时间，这样对于客户是无法接收的；并且像添加客户轨迹这种操作是 不需要去同步操作的，如果使用MQ将客户创建订单时，将后面的轨迹、库存、状态等信息的更新全都放到 MQ里面然后去异步操作，这样就可加快系统的访问速度，提供更好的客户体验。…",
    "keyPoints": [
      "消息队列在异步、解耦和削峰填谷中的作用，各给出一个业务例子",
      "同时说明引入后的延迟、复杂度、可用性依赖、数据一致性和运维成本，不把 MQ 当同步强一致调用的默认替代品"
    ],
    "followUps": [
      "消息队列使用场景有哪些？"
    ],
    "tags": [
      "消息队列",
      "消息队列的价值",
      "使用场景",
      "消息队列的价值与使用场景"
    ],
    "sourceRef": "消息队列 PDF p.1-3：什么是消息队列；消息队列使用场景有哪些",
    "source": "builtin",
    "order": 68
  },
  {
    "id": "java-mq-952b6e2ab0",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "S",
    "score": 10,
    "question": "端到端可靠投递与消息丢失治理应该如何理解？",
    "coreAnswer": "使用一个消息队列，其实就分为三大块：生产者、中间件、消费者，所以要保证消息就是保证三个环节都不能丢失 数据。 消息生产阶段：生产者会不会丢消息，取决于生产者对于异常情况的处理是否合理。从消息被生产出来，然 后提交给 MQ 的过程中，只要能正常收到 （ MQ 中间件） 的 ack 确认响应，就表示发送成功，所以只要处 理好返回值和异常，如果返回异常则进行消息重发，那么这个阶段是不会出现消息丢失的。 消息存储阶段：Kafka 在使用时是部署一个集群，生产者在发布消息时，队列中间件通常会写「多个节点」， 也就是有多个副本，这样一来，即便其中一个节点挂了，也能保证集群的数据不丢失。…",
    "explanation": "消息丢失怎么解决的？：使用一个消息队列，其实就分为三大块：生产者、中间件、消费者，所以要保证消息就是保证三个环节都不能丢失 数据。 消息生产阶段：生产者会不会丢消息，取决于生产者对于异常情况的处理是否合理。从消息被生产出来，然 后提交给 MQ 的过程中，只要能正常收到 （ MQ 中间件） 的 ack 确认响应，就表示发送成功，所以只要处 理好返回值和异常，如果返回异常则进行消息重发，那么这个阶段是不会出现消息丢失的。 消息存储阶段：Kafka 在使用时是部署一个集群，生产者在发布消息时，队列中间件通常会写「多个节点」， 也就是有多个副本，这样一来，即便其中一个节点挂了，也能保证集群的数据不丢失。 消息消费阶段：消费者接收消息+消息处理之后，才回复 ack 的话，那么消息阶段的消息不会丢失。不能收到 消息就回 ack，否则可能消息处理中途挂掉了，消息就丢失了。 如何处理消息队列的消息积压问题？：消息积压是因为生产者的生产速度，大于消费者的消费速度。遇到消息积压问题时，我们需要先排查，是不是有 bug产生了。 如果不是bug，我们可以优化一下消费的逻辑，比如之前是一条一条消息消费处理的话，我们可以确认是不是可以 优为批量处理消息。如果还是慢，我们可以考虑水平扩容，增加Topic的队列数，和消费组机器的数量，提升整体 消费能力。 如果是bug导致几百万消息持续积压几小时。有如何处理呢？需要解决bug，临时紧急扩容，大概思路如下： 1. 先修复consumer消费者的问题，以确保其恢复消费速度，然后将现有consumer 都停掉。 2. 新建一个 topic，partition 是原来的 10 倍，临时建立好原先10倍的queue 数量。 3. 然后写一个临时的分发数据的 consumer 程序，这个程序部署上去消费积压的数据，消费之后不做耗时 的处理，直接均匀轮询写入临时建立好的 10 倍数量的 queue。…",
    "keyPoints": [
      "能按生产者、Broker、消费者三段分析：生产端确认、超时重试与本地消息记录，Broker 持久化、副本和确认时机，消费端业务成功后确认或提交位点、失败重试与死信",
      "能指出每段宕机窗口及监控补偿"
    ],
    "followUps": [
      "如何处理消息队列的消息积压问题？"
    ],
    "tags": [
      "消息队列",
      "端到端可靠投递",
      "消息丢失治理",
      "端到端可靠投递与消息丢失治理"
    ],
    "sourceRef": "消息队列 PDF p.3-4：消息丢失怎么解决；使用消息队列还应该注意哪些问题",
    "source": "builtin",
    "order": 69
  },
  {
    "id": "java-mq-89b2613d33",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "S",
    "score": 10,
    "question": "如何理解重复消息、消费语义与幂等？",
    "coreAnswer": "生产端为了保证消息发送成功，可能会重复推送(直到收到成功ACK)，会产生重复消息。但是一个成熟的MQ Server框架一般会想办法解决，避免存储重复消息(比如：空间换时间，存储已处理过的message_id)，给生产端提 供一个幂等性的发送消息接口。 但是消费端却无法根本解决这个问题，在高并发标准要求下，拉取消息+业务处理+提交消费位移需要做事务处理， 另外消费端服务可能宕机，很可能会拉取到重复消息。 所以，只能业务端自己做控制，对于已经消费成功的消息，本地数据库表或Redis缓存业务标识，每次处理前先进 行校验，保证幂等。 幂等性是指 同一操作的多次执行对系统状态的影响与一次执行结果一致。…",
    "explanation": "消息重复消费怎么解决？：生产端为了保证消息发送成功，可能会重复推送(直到收到成功ACK)，会产生重复消息。但是一个成熟的MQ Server框架一般会想办法解决，避免存储重复消息(比如：空间换时间，存储已处理过的message_id)，给生产端提 供一个幂等性的发送消息接口。 但是消费端却无法根本解决这个问题，在高并发标准要求下，拉取消息+业务处理+提交消费位移需要做事务处理， 另外消费端服务可能宕机，很可能会拉取到重复消息。 所以，只能业务端自己做控制，对于已经消费成功的消息，本地数据库表或Redis缓存业务标识，每次处理前先进 行校验，保证幂等。 如何保证幂等写？：幂等性是指 同一操作的多次执行对系统状态的影响与一次执行结果一致。例如，支付接口若因网络重试被多次调 用，最终应确保仅扣款一次。实现幂等写的核心方案： 唯一标识（幂等键）：客户端为每个请求生成全局唯一ID（如 UUID、业务主键），服务端校验该ID是否已处 理，适用场景接口调用、消息消费等。 数据库事务 + 乐观锁：通过版本号或状态字段控制并发更新，确保多次更新等同于单次操作，适用场景数据 库记录更新（如余额扣减、订单状态变更）。 数据库唯一约束：利用数据库唯一索引防止重复数据写入，适用场景数据插入场景（如订单创建）。 分布式锁：通过锁机制保证同一时刻仅有一个请求执行关键操作，适用场景高并发下的资源抢夺（如秒 杀）。 消息去重：消息队列生产者为每条消息生成唯一的消息 ID，消费者在处理消息前，先检查该消息 ID 是否已经 处理过，如果已经处理过则丢弃该消息。 RocketMQ怎么保证消息不被重复消费：在业务逻辑中实现幂等性，确保即使消息被重复消费，也不会影响业务状态。例如，对于支付或转账类操作，可以 使用唯一订单号或事务ID作为幂等性的标识符，确保同样的操作只会被执行一次。",
    "keyPoints": [
      "生产重试、消费超时、确认或位点提交失败为何产生重复，区分至多一次、至少一次和限定条件下的恰好一次",
      "能用业务唯一键、去重表、状态机或带条件更新实现幂等，并保证“判重加写入”自身原子"
    ],
    "followUps": [
      "如何保证幂等写？",
      "RocketMQ怎么保证消息不被重复消费？"
    ],
    "tags": [
      "消息队列",
      "重复消息",
      "消费语义",
      "幂等",
      "重复消息、消费语义与幂等"
    ],
    "sourceRef": "消息队列 PDF p.3-4、p.11：消息重复消费怎么解决；如何保证幂等写；RocketMQ 怎么保证消息不被重复消费",
    "source": "builtin",
    "order": 70
  },
  {
    "id": "java-mq-d14584162b",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "S",
    "score": 9,
    "question": "如何理解消息顺序、分区与并行度？",
    "coreAnswer": "消息可靠性可以通过下面这些方式来保证 消息持久化：确保消息队列能够持久化消息是非常关键的。在系统崩溃、重启或者网络故障等情况下，未处 理的消息不应丢失。例如，像 RabbitMQ 可以通过配置将消息持久化到磁盘，通过将队列和消息都设置为持 久化的方式（设置 durable = true ），这样在服务器重启后，消息依然可以被重新读取和处理。 消息确认机制：消费者在成功处理消息后，应该向消息队列发送确认（acknowledgment）。消息队列只有 收到确认后，才会将消息从队列中移除。如果没有收到确认，消息队列可能会在一定时间后重新发送消息给 其他消费者或者再次发送给同一个消费者。…",
    "explanation": "消息队列的可靠性、顺序性怎么保证？：消息可靠性可以通过下面这些方式来保证 消息持久化：确保消息队列能够持久化消息是非常关键的。在系统崩溃、重启或者网络故障等情况下，未处 理的消息不应丢失。例如，像 RabbitMQ 可以通过配置将消息持久化到磁盘，通过将队列和消息都设置为持 久化的方式（设置 durable = true ），这样在服务器重启后，消息依然可以被重新读取和处理。 消息确认机制：消费者在成功处理消息后，应该向消息队列发送确认（acknowledgment）。消息队列只有 收到确认后，才会将消息从队列中移除。如果没有收到确认，消息队列可能会在一定时间后重新发送消息给 其他消费者或者再次发送给同一个消费者。以 Kafka 为例，消费者通过 commitSync 或者 commitAsync 方法 来提交偏移量（oﬀset），从而确认消息的消费。 消息重试策略：当消费者处理消息失败时，需要有合理的重试策略。可以设置重试次数和重试间隔时间。… RocketMQ消息顺序怎么保证？：消息的有序性是指消息的消费顺序能够严格保存与消息的发送顺序一致。例如，一个订单产生了3条消息，分别是 订单创建、订单付款和订单完成。在消息消费时，同一条订单要严格按照这个顺序进行消费，否则业务会发生混 乱。同时，不同订单之间的消息又是可以并发消费的，比如可以先执行第三个订单的付款，再执行第二个订单的创 建。 RocketMQ采用了局部顺序一致性的机制，实现了单个队列中的消息严格有序。也就是说，如果想要保证顺序消 费，必须将一组消息发送到同一个队列中，然后再由消费者进行注意消费。 RocketMQ推荐的顺序消费解决方案是：安装业务划分不同的队列，然后将需要顺序消费的消息发往同一队列中即 可，不同业务之间的消息仍采用并发消费。… Kafka 如何保证顺序读取消息？：Kafka 可以保证在同一个分区内消息是有序的，生产者写入到同一分区的消息会按照写入顺序追加到分区日志文件 中，消费者从分区中读取消息时也会按照这个顺序。这是 Kafka 天然具备的特性。 要在 Kafka 中保证顺序读取消息，需要结合生产者、消费者的配置以及合适的业务处理逻辑来实现。以下具体说明 如何实现顺序读取消息： 生产者端确保消息顺序：为了保证消息写入同一分区从而确保顺序性，生产者需要将消息发送到指定分区。 可以通过自定义分区器来实现，通过为消息指定相同的Key，保证相同Key的消息发送到同一分区。…",
    "keyPoints": [
      "全局有序与业务键局部有序，说明同一业务键路由到同一队列或分区、分区内单消费者顺序处理",
      "能分析生产重试、并发消费和失败重试导致的乱序，并说明顺序保证会限制并行度"
    ],
    "followUps": [
      "RocketMQ消息顺序怎么保证？",
      "Kafka 如何保证顺序读取消息？"
    ],
    "tags": [
      "消息队列",
      "消息顺序",
      "分区",
      "并行度",
      "消息顺序、分区与并行度"
    ],
    "sourceRef": "消息队列 PDF p.3-4、p.11、p.14：消息队列可靠性、顺序性怎么保证；RocketMQ 消息顺序怎么保证；Kafka 如何保证顺序读取消息",
    "source": "builtin",
    "order": 71
  },
  {
    "id": "java-mq-858ef37b5d",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "S",
    "score": 9,
    "question": "消息积压定位与治理应该如何理解？",
    "coreAnswer": "消息积压是因为生产者的生产速度，大于消费者的消费速度。遇到消息积压问题时，我们需要先排查，是不是有 bug产生了。 如果不是bug，我们可以优化一下消费的逻辑，比如之前是一条一条消息消费处理的话，我们可以确认是不是可以 优为批量处理消息。如果还是慢，我们可以考虑水平扩容，增加Topic的队列数，和消费组机器的数量，提升整体 消费能力。 如果是bug导致几百万消息持续积压几小时。有如何处理呢？需要解决bug，临时紧急扩容，大概思路如下： 1. 先修复consumer消费者的问题，以确保其恢复消费速度，然后将现有consumer 都停掉。…",
    "explanation": "如何处理消息队列的消息积压问题？：消息积压是因为生产者的生产速度，大于消费者的消费速度。遇到消息积压问题时，我们需要先排查，是不是有 bug产生了。 如果不是bug，我们可以优化一下消费的逻辑，比如之前是一条一条消息消费处理的话，我们可以确认是不是可以 优为批量处理消息。如果还是慢，我们可以考虑水平扩容，增加Topic的队列数，和消费组机器的数量，提升整体 消费能力。 如果是bug导致几百万消息持续积压几小时。有如何处理呢？需要解决bug，临时紧急扩容，大概思路如下： 1. 先修复consumer消费者的问题，以确保其恢复消费速度，然后将现有consumer 都停掉。 2. 新建一个 topic，partition 是原来的 10 倍，临时建立好原先10倍的queue 数量。 3. 然后写一个临时的分发数据的 consumer 程序，这个程序部署上去消费积压的数据，消费之后不做耗时 的处理，直接均匀轮询写入临时建立好的 10 倍数量的 queue。… RocketMQ消息积压了，怎么办？：导致消息积压突然增加，最粗粒度的原因，只有两种：要么是发送变快了，要么是消费变慢了。 要解决积压的问题，可以通过扩容消费端的实例数来提升总体的消费能力。 如果短时间内没有足够的服务器资源进行扩容，没办法的办法是，将系统降级，通过关闭一些不重要的业务，减少 发送方发送的数据量，最低限度让系统还能正常运转，服务一些重要业务。 kafka 消息积压怎么办？：Kafka 消息积压是一个常见的问题，它可能会导致数据处理延迟，甚至影响业务的正常运行，下面是一些解决 Kafka 消息积压问题的常用方法： 增加消费者实例可以提高消息的消费速度，从而缓解积压问题。你需要确保消费者组中的消费者数量不超过 分区数量，因为一个分区同一时间只能被一个消费者消费。 增加 Kafka 主题的分区数量可以提高消息的并行处理能力。在创建新分区后，你需要重新平衡消费者组，让 更多的消费者可以同时消费消息。",
    "keyPoints": [
      "能先比较生产速率、消费速率、消费延迟和失败重试判断突发还是持续积压，再从止损、扩容消费者、增加可并行分区、批量处理、降级非核心逻辑和修复慢依赖治理",
      "顺序键、下游容量与数据过期限制扩容"
    ],
    "followUps": [
      "RocketMQ消息积压了，怎么办？",
      "kafka 消息积压怎么办？"
    ],
    "tags": [
      "消息队列",
      "消息积压定位",
      "治理",
      "消息积压定位与治理"
    ],
    "sourceRef": "消息队列 PDF p.4、p.11、p.14：如何处理消息积压；RocketMQ 消息积压怎么办；Kafka 消息积压怎么办",
    "source": "builtin",
    "order": 72
  },
  {
    "id": "java-base-e92264d61a",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解Java 跨平台与 JVM、JDK、JRE？",
    "coreAnswer": "Java 能支持跨平台，主要依赖于 JVM 关系比较大。 JVM也是一个软件，不同的平台有不同的版本。我们编写的Java源码，编译后会生成一种 .class 文件，称为字节码 文件。Java虚拟机就是负责将字节码文件翻译成特定平台下的机器码然后运行。也就是说，只要在不同平台上安装 对应的JVM，就可以运行字节码文件，运行我们编写的Java程序。 而这个过程中，我们编写的Java程序没有做任何改变，仅仅是通过JVM这一”中间层“，就能在不同平台上运行，真 正实现了”一次编译，到处运行“的目的。…",
    "explanation": "Java为什么是跨平台的？：Java 能支持跨平台，主要依赖于 JVM 关系比较大。 JVM也是一个软件，不同的平台有不同的版本。我们编写的Java源码，编译后会生成一种 .class 文件，称为字节码 文件。Java虚拟机就是负责将字节码文件翻译成特定平台下的机器码然后运行。也就是说，只要在不同平台上安装 对应的JVM，就可以运行字节码文件，运行我们编写的Java程序。 而这个过程中，我们编写的Java程序没有做任何改变，仅仅是通过JVM这一”中间层“，就能在不同平台上运行，真 正实现了”一次编译，到处运行“的目的。 JVM是一个”桥梁“，是一个”中间件“，是实现跨平台的关键，Java代码首先被编译成字节码文件，再由JVM将字节码 文件翻译成机器语言，从而达到运行Java程序的目的。 编译的结果不是生成机器码，而是生成字节码，字节码不能直接运行，必须通过JVM翻译成机器码才能运行。不同 平台下编译生成的字节码是一样的，但是由JVM翻译成的机器码却不一样。… jvm是什么：JVM是 java 虚拟机，主要工作是解释自己的指令集（即字节码）并映射到本地的CPU指令集和OS的系统调用。 JVM屏蔽了与操作系统平台相关的信息，使得Java程序只需要生成在Java虚拟机上运行的目标代码（字节码），就 可在多种平台上不加修改的运行，这也是Java能够“一次编译，到处运行的”原因。 为什么Java解释和编译都有？：首先在Java经过编译之后生成字节码文件，接下来进入JVM中，就有两个步骤编译和解释。 如下图： 编译性： Java源代码首先被编译成字节码，JIT 会把编译过的机器码保存起来,以备下次使用。 解释性： JVM中一个方法调用计数器，当累计计数大于一定值的时候，就使用JIT进行编译生成机器码文件。否则就是用 解释器进行解释执行，然后字节码也是经过解释器进行解释运行的。 所以Java既是编译型也是解释性语言，默认采用的是解释器和编译器混合的模式。",
    "keyPoints": [
      "源码到字节码再到机器码",
      " JVM、JRE、JDK 的包含关系",
      " JVM 本身不跨平台及解释执行、JIT 编译并存"
    ],
    "followUps": [
      "jvm是什么？",
      "为什么Java解释和编译都有？"
    ],
    "tags": [
      "Java基础",
      "Java 跨平台与 JVM",
      "JDK",
      "JRE",
      "Java",
      "JVM"
    ],
    "sourceRef": "Java基础 PDF p.2-4：为什么跨平台；JVM/JDK/JRE 关系；为什么解释和编译都有",
    "source": "builtin",
    "order": 73
  },
  {
    "id": "java-base-a415738db9",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解反射原理与框架应用？",
    "coreAnswer": "在 Java 中，私有对象通常指的是类中被声明为 private 的成员变量或方法。由于 private 访问修饰符的限制， 这些成员只能在其所在的类内部被访问。 不过，可以通过下面两种方式来间接获取私有对象。 使用公共访问器方法（getter 方法）：如果类的设计者遵循良好的编程规范，通常会为私有成员变量提供公 共的访问器方法（即 getter 方法），通过调用这些方法可以安全地获取私有对象。…",
    "explanation": "如何获取私有对象？：在 Java 中，私有对象通常指的是类中被声明为 private 的成员变量或方法。由于 private 访问修饰符的限制， 这些成员只能在其所在的类内部被访问。 不过，可以通过下面两种方式来间接获取私有对象。 使用公共访问器方法（getter 方法）：如果类的设计者遵循良好的编程规范，通常会为私有成员变量提供公 共的访问器方法（即 getter 方法），通过调用这些方法可以安全地获取私有对象。… 什么是反射？：Java 反射机制是在运行状态中，对于任意一个类，都能够知道这个类中的所有属性和方法，对于任意一个对象，都 能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 Java 语言的反射机 制。 反射具有以下特性： 1. 运行时类信息访问：反射机制允许程序在运行时获取类的完整结构信息，包括类名、包名、父类、实现的接 口、构造函数、方法和字段等。 2. 动态对象创建：可以使用反射API动态地创建对象实例，即使在编译时不知道具体的类名。这是通过Class类的 newInstance()方法或Constructor对象的newInstance()方法实现的。 3. 动态方法调用：可以在运行时动态地调用对象的方法，包括私有方法。这通过Method类的invoke()方法实 现，允许你传入对象实例和参数值来执行方法。 4. 访问和修改字段值：反射还允许程序在运行时访问和修改对象的字段值，即使是私有的。… 反射在你平时写代码或者框架中的应用场景有哪些?：加载数据库驱动 我们的项目底层数据库有时是用mysql，有时用oracle，需要动态地根据实际情况加载驱动类，这个时候反射就有 用了，假设 com.mikechen.java.myqlConnection，com.mikechen.java.oracleConnection这两个类我们要用。 这时候我们在使用 JDBC 连接数据库时使用 Class.forName()通过反射加载数据库的驱动程序，如果是mysql则传入 mysql的驱动类，而如果是oracle则传入的参数就变成另一个了。 // DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver()); Class.forName(\"com.mysql.cj.jdbc.Driver\"); 配置文件加载",
    "keyPoints": [
      " Class 对象讲到构造器、字段、方法访问",
      "反射可绕过普通私有成员访问检查及其封装风险",
      "动态性与性能代价，并举出 Spring IoC、ORM、测试框架应用"
    ],
    "followUps": [
      "什么是反射？",
      "反射在你平时写代码或者框架中的应用场景有哪些?"
    ],
    "tags": [
      "Java基础",
      "反射原理",
      "框架应用",
      "反射原理与框架应用"
    ],
    "sourceRef": "Java基础 PDF p.25-29：如何获取私有对象；什么是反射；反射在代码或框架中的场景",
    "source": "builtin",
    "order": 74
  },
  {
    "id": "java-base-825c7b4dd5",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解Stream 流式处理与并行流？",
    "coreAnswer": "是 ParallelStream。 并行流（ParallelStream）就是将源数据分为多个子流对象进行多线程操作，然后将处理的结果再汇总为一个流对 象，底层是使用通用的 fork/join 池来实现，即将一个任务拆分成多个“小任务”并行计算，再把多个“小任务”的结果 合并成总的计算结果 Stream串行流与并行流的主要区别： 对CPU密集型的任务来说，并行流使用ForkJoinPool线程池，为每个CPU分配一个任务，这是非常有效率的，但是 如果任务不是CPU密集的，而是I/O密集的，并且任务数相对线程数比较大，那么直接用ParallelStream并不是很好 的选择。",
    "explanation": "Stream流的并行API是什么？：是 ParallelStream。 并行流（ParallelStream）就是将源数据分为多个子流对象进行多线程操作，然后将处理的结果再汇总为一个流对 象，底层是使用通用的 fork/join 池来实现，即将一个任务拆分成多个“小任务”并行计算，再把多个“小任务”的结果 合并成总的计算结果 Stream串行流与并行流的主要区别： 对CPU密集型的任务来说，并行流使用ForkJoinPool线程池，为每个CPU分配一个任务，这是非常有效率的，但是 如果任务不是CPU密集的，而是I/O密集的，并且任务数相对线程数比较大，那么直接用ParallelStream并不是很好 的选择。",
    "keyPoints": [
      "中间操作与终止操作",
      " map/filter/reduce/collect",
      "流不可复用、惰性求值，以及 parallelStream 的线程池和适用边界"
    ],
    "followUps": [
      "中间操作与终止操作？",
      " map/filter/reduce/collect？"
    ],
    "tags": [
      "Java基础",
      "Stream 流式处理",
      "并行流",
      "Stream",
      "Stream 流式处理与并行流"
    ],
    "sourceRef": "Java基础 PDF p.37-38：Stream API；Stream 并行 API",
    "source": "builtin",
    "order": 75
  },
  {
    "id": "java-base-7538b4ff44",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解重载与重写？",
    "coreAnswer": "重载（Overloading）指的是在同一个类中，可以有多个同名方法，它们具有不同的参数列表（参数类型、参 数个数或参数顺序不同），编译器根据调用时的参数类型来决定调用哪个方法。 重写（Overriding）指的是子类可以重新定义父类中的方法，方法名、参数列表和返回类型必须与父类中的方 法一致，通过@override注解来明确表示这是对父类方法的重写。 重载是指在同一个类中定义多个同名方法，而重写是指子类重新定义父类中的方法。",
    "explanation": "重载与重写有什么区别？：重载（Overloading）指的是在同一个类中，可以有多个同名方法，它们具有不同的参数列表（参数类型、参 数个数或参数顺序不同），编译器根据调用时的参数类型来决定调用哪个方法。 重写（Overriding）指的是子类可以重新定义父类中的方法，方法名、参数列表和返回类型必须与父类中的方 法一致，通过@override注解来明确表示这是对父类方法的重写。 重载是指在同一个类中定义多个同名方法，而重写是指子类重新定义父类中的方法。",
    "keyPoints": [
      "编译期重载和运行期重写",
      "参数列表、返回值、访问权限、异常范围和 static/final/private 的限制"
    ],
    "followUps": [
      "编译期重载和运行期重写？",
      "参数列表、返回值、访问权限、异常范围和 static/final/private 的限制？"
    ],
    "tags": [
      "Java基础",
      "重载",
      "重写",
      "重载与重写"
    ],
    "sourceRef": "Java基础 PDF p.14-15：重载与重写有什么区别",
    "source": "builtin",
    "order": 76
  },
  {
    "id": "java-base-caa39dea0f",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解抽象类与接口？",
    "coreAnswer": "实例化：普通类可以直接实例化对象，而抽象类不能被实例化，只能被继承。 方法实现：普通类中的方法可以有具体的实现，而抽象类中的方法可以有实现也可以没有实现。 继承：一个类可以继承一个普通类，而且可以继承多个接口；而一个类只能继承一个抽象类，但可以同时实 现多个接口。 实现限制：普通类可以被其他类继承和使用，而抽象类一般用于作为基类，被其他类继承和扩展使用。 两者的特点： 抽象类用于描述类的共同特性和行为，可以有成员变量、构造方法和具体方法。适用于有明显继承关系的场 景。 接口用于定义行为规范，可以多实现，只能有常量和抽象方法（Java 8 以后可以有默认方法和静态方法）。 适用于定义类的能力或功能。…",
    "explanation": "抽象类和普通类区别？：实例化：普通类可以直接实例化对象，而抽象类不能被实例化，只能被继承。 方法实现：普通类中的方法可以有具体的实现，而抽象类中的方法可以有实现也可以没有实现。 继承：一个类可以继承一个普通类，而且可以继承多个接口；而一个类只能继承一个抽象类，但可以同时实 现多个接口。 实现限制：普通类可以被其他类继承和使用，而抽象类一般用于作为基类，被其他类继承和扩展使用。 Java抽象类和接口的区别是什么？：两者的特点： 抽象类用于描述类的共同特性和行为，可以有成员变量、构造方法和具体方法。适用于有明显继承关系的场 景。 接口用于定义行为规范，可以多实现，只能有常量和抽象方法（Java 8 以后可以有默认方法和静态方法）。 适用于定义类的能力或功能。 两者的区别： 实现方式：实现接口的关键字为implements，继承抽象类的关键字为extends。一个类可以实现多个接口， 但一个类只能继承一个抽象类。所以，使用接口可以间接地实现多重继承。 方法方式：接口只有定义，不能有方法的实现，java 1.8中可以定义default方法体，而抽象类可以有定义与实 现，方法可在抽象类中实现。 访问修饰符：接口成员变量默认为public static ﬁnal，必须赋初值，不能被修改；其所有的成员方法都是 public、abstract的。抽象类中成员变量默认default，可在子类中被重新定义，也可被重新赋值；… 接口里面可以定义哪些方法？：抽象方法 抽象方法是接口的核心部分，所有实现接口的类都必须实现这些方法。抽象方法默认是 public 和 abstract，这些 修饰符可以省略。 public interface Animal { void makeSound(); } 默认方法 默认方法是在 Java 8 中引入的，允许接口提供具体实现。实现类可以选择重写默认方法。 public interface Animal { void makeSound(); default void sleep() { System.out.println(\"Sleeping...\"); } } 静态方法 静态方法也是在 Java 8 中引入的，它们属于接口本身，可以通过接口名直接调用，而不需要实现类的对象。…",
    "keyPoints": [
      "继承数量、状态、构造器和方法实现",
      "接口 default/static/private 方法",
      "抽象类不能实例化、不能用 final 修饰"
    ],
    "followUps": [
      "Java抽象类和接口的区别是什么？",
      "接口里面可以定义哪些方法？"
    ],
    "tags": [
      "Java基础",
      "抽象类",
      "接口",
      "抽象类与接口"
    ],
    "sourceRef": "Java基础 PDF p.15-17：抽象类与普通类；抽象类与接口；接口可定义哪些方法",
    "source": "builtin",
    "order": 77
  },
  {
    "id": "java-base-31856ccd41",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "static 与 final 语义应该如何理解？",
    "coreAnswer": "在Java中，静态变量和静态方法是与类本身关联的，而不是与类的实例（对象）关联。它们在内存中只存在一份， 可以被类的所有实例共享。 静态变量 静态变量（也称为类变量）是在类中使用 static 关键字声明的变量。它们属于类而不是任何具体的对象。主要的 特点： 共享性：所有该类的实例共享同一个静态变量。如果一个实例修改了静态变量的值，其他实例也会看到这个 更改。 初始化：静态变量在类被加载时初始化，只会对其进行一次分配内存。 访问方式：静态变量可以直接通过类名访问，也可以通过实例访问，但推荐使用类名。…",
    "explanation": "解释Java中的静态变量和静态方法：在Java中，静态变量和静态方法是与类本身关联的，而不是与类的实例（对象）关联。它们在内存中只存在一份， 可以被类的所有实例共享。 静态变量 静态变量（也称为类变量）是在类中使用 static 关键字声明的变量。它们属于类而不是任何具体的对象。主要的 特点： 共享性：所有该类的实例共享同一个静态变量。如果一个实例修改了静态变量的值，其他实例也会看到这个 更改。 初始化：静态变量在类被加载时初始化，只会对其进行一次分配内存。 访问方式：静态变量可以直接通过类名访问，也可以通过实例访问，但推荐使用类名。… Java 中 ﬁnal 作用是什么？：final 关键字主要有以下三个方面的作用：用于修饰类、方法和变量。 修饰类：当 final 修饰一个类时，表示这个类不能被继承，是类继承体系中的最终形态。例如，Java 中的 String 类就是用 final 修饰的，这保证了 String 类的不可变性和安全性，防止其他类通过继承来改变 String 类的行为和特性。 修饰方法：用 final 修饰的方法不能在子类中被重写。比如， java.lang.Object 类中的 getClass 方法就 是 final 的，因为这个方法的行为是由 Java 虚拟机底层实现来保证的，不应该被子类修改。 修饰变量：当 final 修饰基本数据类型的变量时，该变量一旦被赋值就不能再改变。例如， final int num = 10; ，这里的 num 就是一个常量，不能再对其进行重新赋值操作，否则会导致编译错误。…",
    "keyPoints": [
      "类成员与实例成员的归属和访问限制",
      "分别解释 final 修饰变量、方法、类",
      "引用不可变与对象内容不可变"
    ],
    "followUps": [
      "Java 中 ﬁnal 作用是什么？"
    ],
    "tags": [
      "Java基础",
      "static",
      "final 语义",
      "final",
      "static 与 final 语义"
    ],
    "sourceRef": "Java基础 PDF p.17-19：静态变量和静态方法；final 的作用",
    "source": "builtin",
    "order": 78
  },
  {
    "id": "java-base-abee9bd14a",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解Java 泛型与类型擦除？",
    "coreAnswer": "泛型是 Java 编程语言中的一个重要特性，它允许类、接口和方法在定义时使用一个或多个类型参数，这些类型参 数在使用时可以被指定为具体的类型。 泛型的主要目的是在编译时提供更强的类型检查，并且在编译后能够保留类型信息，避免了在运行时出现类型转换 异常。",
    "explanation": "什么是泛型？：泛型是 Java 编程语言中的一个重要特性，它允许类、接口和方法在定义时使用一个或多个类型参数，这些类型参 数在使用时可以被指定为具体的类型。 泛型的主要目的是在编译时提供更强的类型检查，并且在编译后能够保留类型信息，避免了在运行时出现类型转换 异常。",
    "keyPoints": [
      "泛型类、方法、接口的价值",
      "类型擦除与运行期限制",
      " ? extends 和 ? super 的读写边界"
    ],
    "followUps": [
      "泛型类、方法、接口的价值？",
      "类型擦除与运行期限制？"
    ],
    "tags": [
      "Java基础",
      "Java 泛型",
      "类型擦除",
      "Java",
      "Java 泛型与类型擦除"
    ],
    "sourceRef": "Java基础 PDF p.22-23：什么是泛型",
    "source": "builtin",
    "order": 79
  },
  {
    "id": "java-base-1a814a367f",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 6,
    "question": "如何理解注解定义、作用域与解析？",
    "coreAnswer": "注解本质是一个继承了Annotation的特殊接口，其具体实现类是Java运行时生成的动态代理类。 我们通过反射获取注解时，返回的是Java运行时生成的动态代理对象。通过代理对象调用自定义注解的方法，会最 终调用AnnotationInvocationHandler的invoke方法。该方法会从memberValues这个Map中索引出对应的值。而 memberValues的来源是Java常量池。…",
    "explanation": "能讲一讲Java注解的原理吗？：注解本质是一个继承了Annotation的特殊接口，其具体实现类是Java运行时生成的动态代理类。 我们通过反射获取注解时，返回的是Java运行时生成的动态代理对象。通过代理对象调用自定义注解的方法，会最 终调用AnnotationInvocationHandler的invoke方法。该方法会从memberValues这个Map中索引出对应的值。而 memberValues的来源是Java常量池。 对注解解析的底层实现了解吗？：注解本质上是一种特殊的接口，它继承自 java.lang.annotation.Annotation 接口，所以注解也叫声明式接口， 例如，定义一个简单的注解： public @interface MyAnnotation { String value(); } 编译后，Java 编译器会将其转换为一个继承自 Annotation 的接口，并生成相应的字节码文件。 根据注解的作用范围，Java 注解可以分为以下几种类型： 源码级别注解 ：仅存在于源码中，编译后不会保留（ @Retention(RetentionPolicy.SOURCE) ）。 类文件级别注解 ：保留在 .class 文件中，但运行时不可见（ @Retention(RetentionPolicy.CLASS) ）。… Java注解的作用域呢？：注解的作用域（Scope）指的是注解可以应用在哪些程序元素上，例如类、方法、字段等。Java注解的作用域可以 分为三种： 1. 类级别作用域：用于描述类的注解，通常放置在类定义的上面，可以用来指定类的一些属性，如类的访问级 别、继承关系、注释等。 2. 方法级别作用域：用于描述方法的注解，通常放置在方法定义的上面，可以用来指定方法的一些属性，如方 法的访问级别、返回值类型、异常类型、注释等。 3. 字段级别作用域：用于描述字段的注解，通常放置在字段定义的上面，可以用来指定字段的一些属性，如字 段的访问级别、默认值、注释等。 除了这三种作用域，Java还提供了其他一些注解作用域，例如构造函数作用域和局部变量作用域。这些注解作用域 可以用来对构造函数和局部变量进行描述和注释。",
    "keyPoints": [
      "元注解 Target、Retention、Inherited、Documented",
      "源码/类/运行时保留",
      "运行时通过反射读取注解"
    ],
    "followUps": [
      "对注解解析的底层实现了解吗？",
      "Java注解的作用域呢？"
    ],
    "tags": [
      "Java基础",
      "注解定义",
      "作用域",
      "解析",
      "注解定义、作用域与解析"
    ],
    "sourceRef": "Java基础 PDF p.29-30：注解原理；注解解析底层；注解作用域",
    "source": "builtin",
    "order": 80
  },
  {
    "id": "java-base-ca9cbb638f",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 6,
    "question": "如何理解Java 8 特性与 Lambda？",
    "coreAnswer": "下面是 Java 8 主要新特性的整理表格，包含关键改进和示例说明： 特性名称 描述 示例或说明 Lambda 表达式 简化匿名内部类，支持函数式编程 (a, b) -> a + b 代替匿名类实现接口 函数式接口 Stream API Optional 类 方法引用 仅含一个抽象方法的接口，可用 @FunctionalInterface 注解标记 Runnable , Comparator , 或自定义接口 @FunctionalInterface interface MyFunc { void run(); } 提供链式操作处理集合数据，支持并 list.stream().filter(x -> x > 行处理 0).colle…",
    "explanation": "Java 8 你知道有什么新特性？：下面是 Java 8 主要新特性的整理表格，包含关键改进和示例说明： 特性名称 描述 示例或说明 Lambda 表达式 简化匿名内部类，支持函数式编程 (a, b) -> a + b 代替匿名类实现接口 函数式接口 Stream API Optional 类 方法引用 仅含一个抽象方法的接口，可用 @FunctionalInterface 注解标记 Runnable , Comparator , 或自定义接口 @FunctionalInterface interface MyFunc { void run(); } 提供链式操作处理集合数据，支持并 list.stream().filter(x -> x > 行处理 0).collect(Collectors.toList()) 封装可能为 null 的对象，减少空指 针异常 Optional.ofNullable(value).orElse(\"default\") 简化 Lamb… Lambda 表达式了解吗？：Lambda 表达式它是一种简洁的语法，用于创建匿名函数，主要用于简化函数式接口（只有一个抽象方法的接口） 的使用。其基本语法有以下两种形式： (parameters) -> expression ：当 Lambda 体只有一个表达式时使用，表达式的结果会作为返回值。 (parameters) -> { statements; } ：当 Lambda 体包含多条语句时，需要使用大括号将语句括起来，若有返 回值则需要使用 return 语句。 传统的匿名内部类实现方式代码较为冗长，而 Lambda 表达式可以用更简洁的语法实现相同的功能。…",
    "keyPoints": [
      " Lambda、函数式接口、Stream、Optional、接口默认方法和新日期 API",
      "能把匿名类改写成 Lambda 并说明变量捕获限制"
    ],
    "followUps": [
      "Lambda 表达式了解吗？"
    ],
    "tags": [
      "Java基础",
      "Java 8 特性与 Lambda",
      "Java",
      "Lambda"
    ],
    "sourceRef": "Java基础 PDF p.34-37：Java 8 新特性；Lambda 表达式",
    "source": "builtin",
    "order": 81
  },
  {
    "id": "java-base-19a8b80ee7",
    "deckId": "java-basics-sample",
    "topic": "Java基础",
    "importance": "A",
    "score": 7,
    "question": "如何理解Java I/O 模型：BIO、NIO、AIO？",
    "coreAnswer": "可以用 Java NIO ，是一种同步非阻塞的I/O模型，也是I/O多路复用的基础。 传统的BIO里面socket.read()，如果TCP RecvBuﬀer里没有数据，函数会一直阻塞，直到收到数据，返回读到的数 据， 如果使用BIO要想要并发处理多个客户端的i/o，那么会使用多线程模式，一个线程专门处理一个客户端 io， 这种模式随着客户端越来越多，所需要创建的线程也越来越多，会急剧消耗系统的性能。 NIO 是基于I/O多路复用实现的，它可以只用一个线程处理多个客户端I/O，如果你需要同时管理成千上万的连接， 但是每个连接只发送少量数据，例如一个聊天服务器，用NIO实现会更好一些。…",
    "explanation": "Java怎么实现网络IO高并发编程？：可以用 Java NIO ，是一种同步非阻塞的I/O模型，也是I/O多路复用的基础。 传统的BIO里面socket.read()，如果TCP RecvBuﬀer里没有数据，函数会一直阻塞，直到收到数据，返回读到的数 据， 如果使用BIO要想要并发处理多个客户端的i/o，那么会使用多线程模式，一个线程专门处理一个客户端 io， 这种模式随着客户端越来越多，所需要创建的线程也越来越多，会急剧消耗系统的性能。 NIO 是基于I/O多路复用实现的，它可以只用一个线程处理多个客户端I/O，如果你需要同时管理成千上万的连接， 但是每个连接只发送少量数据，例如一个聊天服务器，用NIO实现会更好一些。 BIO、NIO、AIO区别是什么？：BIO（blocking IO）：就是传统的 java.io 包，它是基于流模型实现的，交互的方式是同步、阻塞方式，也就 是说在读入输入流或者输出流时，在读写动作完成之前，线程会一直阻塞在那里，它们之间的调用是可靠的 线性顺序。优点是代码比较简单、直观；缺点是 IO 的效率和扩展性很低，容易成为应用性能瓶颈。 NIO（non-blocking IO） ：Java 1.4 引入的 java.nio 包，提供了 Channel、Selector、Buﬀer 等新的抽象， 可以构建多路复用的、同步非阻塞 IO 程序，同时提供了更接近操作系统底层高性能的数据操作方式。…",
    "keyPoints": [
      "阻塞、同步非阻塞、异步模型",
      " NIO 的 Buffer、Channel、Selector 与多路复用",
      "能举出 Netty 等应用"
    ],
    "followUps": [
      "BIO、NIO、AIO区别是什么？"
    ],
    "tags": [
      "Java基础",
      "Java I",
      "O 模型",
      "BIO",
      "NIO",
      "AIO"
    ],
    "sourceRef": "Java基础 PDF p.43-46：网络 IO 高并发；BIO/NIO/AIO；NIO 实现及框架",
    "source": "builtin",
    "order": 82
  },
  {
    "id": "java-collections-245061d3c9",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "如何理解集合遍历、迭代器与遍历中修改？",
    "coreAnswer": "在Java中，集合的遍历方法主要有以下几种： 普通 for 循环： 可以使用带有索引的普通 for 循环来遍历 List。 List<String> list = new ArrayList<>(); list.add(\"A\"); list.add(\"B\"); list.add(\"C\"); for (int i = 0; i < list.size(); i++) { String element = list.get(i); System.out.println(element); } 增强 for 循环（for-each循环）： 用于循环访问数组或集合中的元素。…",
    "explanation": "集合遍历的方法有哪些？：在Java中，集合的遍历方法主要有以下几种： 普通 for 循环： 可以使用带有索引的普通 for 循环来遍历 List。 List<String> list = new ArrayList<>(); list.add(\"A\"); list.add(\"B\"); list.add(\"C\"); for (int i = 0; i < list.size(); i++) { String element = list.get(i); System.out.println(element); } 增强 for 循环（for-each循环）： 用于循环访问数组或集合中的元素。… List：常见的List集合（非线程安全）： ArrayList 基于动态数组实现，它允许快速的随机访问，即通过索引访问元素的时间复杂度为 O (1)。在添加 和删除元素时，如果操作位置不是列表末尾，可能需要移动大量元素，性能相对较低。适用于需要频繁随机 访问元素，而对插入和删除操作性能要求不高的场景，如数据的查询和展示等。 LinkedList 基于双向链表实现，在插入和删除元素时，只需修改链表的指针，不需要移动大量元素，时间复 杂度为 O (1)。但随机访问元素时，需要从链表头或链表尾开始遍历，时间复杂度为 O (n)。适用于需要频繁 进行插入和删除操作的场景，如队列、栈等数据结构的实现，以及需要在列表中间频繁插入和删除元素的情 况。 常见的List集合（线程安全）： Vector 和 ArrayList 类似，也是基于数组实现。… list如何快速删除某个指定下标的元素？：ArrayList 提供了 remove(int index) 方法来删除指定下标的元素，该方法在删除元素后，会将后续元素向前移 动，以填补被删除元素的位置。如果删除的是列表末尾的元素，时间复杂度为 O (1)；如果删除的是列表中间的元 素，时间复杂度为 O (n)，n 为列表中元素的个数，因为需要移动后续的元素。…",
    "keyPoints": [
      " for、增强 for、Iterator、forEach/Stream",
      "增强 for 本质及 fail-fast",
      "遍历删除用 Iterator.remove，更新元素说明 set 的适用方式"
    ],
    "followUps": [
      "List？",
      "list如何快速删除某个指定下标的元素？"
    ],
    "tags": [
      "Java集合",
      "集合遍历",
      "迭代器",
      "遍历中修改",
      "集合遍历、迭代器与遍历中修改"
    ],
    "sourceRef": "Java集合 PDF p.4-9：集合遍历；List 边遍历边修改；快速删除指定下标",
    "source": "builtin",
    "order": 83
  },
  {
    "id": "java-concurrent-hashmap",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "ConcurrentHashMap 如何保证并发安全？",
    "coreAnswer": "JDK 1.7 ConcurrentHashMap 在 JDK 1.7 中它使用的是数组加链表的形式实现的，而数组又分为：大数组 Segment 和小数组 HashEntry。 Segment 是一种可重入锁（ReentrantLock），在 ConcurrentHashMap 里扮演锁的角色；HashEntry 则用于存 储键值对数据。一个 ConcurrentHashMap 里包含一个 Segment 数组，一个 Segment 里包含一个 HashEntry 数 组，每个 HashEntry 是一个链表结构的元素。…",
    "explanation": "ConcurrentHashMap怎么实现的？：JDK 1.7 ConcurrentHashMap 在 JDK 1.7 中它使用的是数组加链表的形式实现的，而数组又分为：大数组 Segment 和小数组 HashEntry。 Segment 是一种可重入锁（ReentrantLock），在 ConcurrentHashMap 里扮演锁的角色；HashEntry 则用于存 储键值对数据。一个 ConcurrentHashMap 里包含一个 Segment 数组，一个 Segment 里包含一个 HashEntry 数 组，每个 HashEntry 是一个链表结构的元素。 JDK 1.7 ConcurrentHashMap 分段锁技术将数据分成一段一段的存储，然后给每一段数据配一把锁，当一个线程 占用锁访问其中一个段数据的时候，其他段的数据也能被其他线程访问，能够实现真正的并发访问。… 分段锁怎么加锁的？：在 ConcurrentHashMap 中，将整个数据结构分为多个 Segment，每个 Segment 都类似于一个小的 HashMap， 每个 Segment 都有自己的锁，不同 Segment 之间的操作互不影响，从而提高并发性能。 在 ConcurrentHashMap 中，对于插入、更新、删除等操作，需要先定位到具体的 Segment，然后再在该 Segment 上加锁，而不是像传统的 HashMap 一样对整个数据结构加锁。这样可以使得不同 Segment 之间的操作 并行进行，提高了并发性能。",
    "keyPoints": [
      " JDK 7 Segment 与 JDK 8 数组节点",
      " JDK 8 put 中 CAS 空桶、synchronized 桶头、协助扩容",
      "读操作与复合操作边界"
    ],
    "followUps": [
      "分段锁怎么加锁的？"
    ],
    "tags": [
      "Java集合",
      "ConcurrentHashMap 实现原理",
      "ConcurrentHashMap"
    ],
    "sourceRef": "Java集合 PDF p.22-26：ConcurrentHashMap 实现；分段锁；CAS 与 synchronized；锁类型",
    "source": "builtin",
    "order": 84
  },
  {
    "id": "java-collections-095015e18e",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "线程安全集合的分类与选型是什么？",
    "coreAnswer": "在 java.util 包中的线程安全的类主要 2 个，其他都是非线程安全的。 Vector：线程安全的动态数组，其内部方法基本都经过synchronized修饰，如果不需要线程安全，并不建议 选择，毕竟同步是有额外开销的。Vector 内部是使用对象数组来保存数据，可以根据需要自动的增加容量， 当数组已满时，会创建新的数组，并拷贝原有数组数据。…",
    "explanation": "Java中的线程安全的集合是什么？：在 java.util 包中的线程安全的类主要 2 个，其他都是非线程安全的。 Vector：线程安全的动态数组，其内部方法基本都经过synchronized修饰，如果不需要线程安全，并不建议 选择，毕竟同步是有额外开销的。Vector 内部是使用对象数组来保存数据，可以根据需要自动的增加容量， 当数组已满时，会创建新的数组，并拷贝原有数组数据。 Hashtable：线程安全的哈希表，HashTable 的加锁方法是给每个方法加上 synchronized 关键字，这样锁住 的是整个 Table 对象，不支持 null 键和值，由于同步导致的性能开销，所以已经很少被推荐使用，如果要保 证线程安全的哈希表，可以用ConcurrentHashMap。…",
    "keyPoints": [
      " Collections 同步包装、旧式 Vector/Hashtable 和 JUC 集合",
      "能按读多写少、阻塞队列、有序并发 Map 等场景选择"
    ],
    "followUps": [
      " Collections 同步包装、旧式 Vector/Hashtable 和 JUC 集合？",
      "能按读多写少、阻塞队列、有序并发 Map 等场景选择？"
    ],
    "tags": [
      "Java集合",
      "线程安全集合的分类",
      "选型",
      "线程安全集合的分类与选型"
    ],
    "sourceRef": "Java集合 PDF p.2-4：Java 中线程安全的集合",
    "source": "builtin",
    "order": 85
  },
  {
    "id": "java-collections-d225023026",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 6,
    "question": "如何理解ArrayList 的线程安全替代方案？",
    "coreAnswer": "不是线程安全的，ArrayList变成线程安全的方式有： 使用Collections类的synchronizedList方法将ArrayList包装成线程安全的List： List<String> synchronizedList = Collections.synchronizedList(arrayList); 使用CopyOnWriteArrayList类代替ArrayList，它是一个线程安全的List实现： CopyOnWriteArrayList<String> copyOnWriteArrayList = new CopyOnWriteArrayList<>(arrayList); 使用Vector类代替ArrayLi…",
    "explanation": "ArrayList线程安全吗？把ArrayList变成线程安全有哪些方法？：不是线程安全的，ArrayList变成线程安全的方式有： 使用Collections类的synchronizedList方法将ArrayList包装成线程安全的List： List<String> synchronizedList = Collections.synchronizedList(arrayList); 使用CopyOnWriteArrayList类代替ArrayList，它是一个线程安全的List实现： CopyOnWriteArrayList<String> copyOnWriteArrayList = new CopyOnWriteArrayList<>(arrayList); 使用Vector类代替ArrayList，Vector是线程安全的List实现： Vector<String> vector = new Vector<>(arrayList);",
    "keyPoints": [
      " ArrayList 在并发 add/扩容时的竞态",
      "外部加锁、synchronizedList、CopyOnWriteArrayList",
      "复合操作仍需整体同步"
    ],
    "followUps": [
      " ArrayList 在并发 add/扩容时的竞态？",
      "外部加锁、synchronizedList、CopyOnWriteArrayList？"
    ],
    "tags": [
      "Java集合",
      "ArrayList 的线程安全替代方案",
      "ArrayList"
    ],
    "sourceRef": "Java集合 PDF p.10-12：ArrayList 是否线程安全；具体哪里不安全；如何改造",
    "source": "builtin",
    "order": 86
  },
  {
    "id": "java-hashmap-thread-safety",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "HashMap 为什么线程不安全？",
    "coreAnswer": "hashmap不是线程安全的，hashmap在多线程会存在下面的问题： JDK 1.7 HashMap 采用数组 + 链表的数据结构，多线程背景下，在数组扩容的时候，存在 Entry 链死循环和 数据丢失问题。 JDK 1.8 HashMap 采用数组 + 链表 + 红黑二叉树的数据结构，优化了 1.7 中数组扩容的方案，解决了 Entry 链死循环和数据丢失问题。但是多线程背景下，put 方法存在数据覆盖的问题。…",
    "explanation": "HashMap是线程安全的吗？：hashmap不是线程安全的，hashmap在多线程会存在下面的问题： JDK 1.7 HashMap 采用数组 + 链表的数据结构，多线程背景下，在数组扩容的时候，存在 Entry 链死循环和 数据丢失问题。 JDK 1.8 HashMap 采用数组 + 链表 + 红黑二叉树的数据结构，优化了 1.7 中数组扩容的方案，解决了 Entry 链死循环和数据丢失问题。但是多线程背景下，put 方法存在数据覆盖的问题。 如果要保证线程安全，可以通过这些方法来保证： 多线程环境可以使用Collections.synchronizedMap同步加锁的方式，还可以使用HashTable，但是同步的方 式显然性能不达标，而ConurrentHashMap更适合高并发场景使用。… HashMap的扩容机制介绍一下：hashMap默认的负载因子是0.75，即如果hashmap中的元素个数超过了总容量75%，则会触发扩容，扩容分为两 个步骤： 第1步是对哈希表长度的扩展（2倍） 第2步是将旧哈希表中的数据放到新的哈希表中。 因为我们使用的是2次幂的扩展(指长度扩为原来2倍)，所以，元素的位置要么是在原位置，要么是在原位置再移动 2次幂的位置。 如我们从16扩展为32时，具体的变化如下所示： 因此元素在重新计算hash之后，因为n变为2倍，那么n-1的mask范围在高位多1bit(红色)，因此新的index就会发 生这样的变化： 因此，我们在扩充HashMap的时候，不需要重新计算hash，只需要看看原来的hash值新增的那个bit是1还是0就 好了，是0的话索引没变，是1的话索引变成“原索引+oldCap”。…",
    "keyPoints": [
      "并发 put、扩容、覆盖、size 不准确和可见性问题",
      " JDK 7 环形链表历史风险",
      "只读也要满足安全发布和无并发写"
    ],
    "followUps": [
      "HashMap的扩容机制介绍一下？"
    ],
    "tags": [
      "Java集合",
      "HashMap 的并发风险",
      "HashMap"
    ],
    "sourceRef": "Java集合 PDF p.17-21：HashMap 是否线程安全；get 是否一定安全；多线程问题",
    "source": "builtin",
    "order": 87
  },
  {
    "id": "java-collections-e57380c637",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "HashMap、Hashtable、ConcurrentHashMap 对比是什么？",
    "coreAnswer": "Hashtable的底层数据结构主要是数组加上链表，数组是主体，链表是解决hash冲突存在的。 HashTable是线程安全的，实现方式是Hashtable的所有公共方法均采用synchronized关键字，当一个线程 访问同步方法，另一个线程也访问的时候，就会陷入阻塞或者轮询的状态。 HashMap线程不安全，效率高一点，可以存储null的key和value，null的key只能有一个，null的value可以 有多个。默认初始容量为16，每次扩充变为原来2倍。创建时如果给定了初始容量，则扩充为2的幂次方大 小。…",
    "explanation": "HashTable 底层实现原理是什么？：Hashtable的底层数据结构主要是数组加上链表，数组是主体，链表是解决hash冲突存在的。 HashTable是线程安全的，实现方式是Hashtable的所有公共方法均采用synchronized关键字，当一个线程 访问同步方法，另一个线程也访问的时候，就会陷入阻塞或者轮询的状态。 Hashmap和Hashtable有什么不一样的？Hashmap一般怎么用？：HashMap线程不安全，效率高一点，可以存储null的key和value，null的key只能有一个，null的value可以 有多个。默认初始容量为16，每次扩充变为原来2倍。创建时如果给定了初始容量，则扩充为2的幂次方大 小。底层数据结构为数组+链表，插入元素后如果链表长度大于阈值（默认为8），先判断数组长度是否小于 64，如果小于，则扩充数组，反之将链表转化为红黑树，以减少搜索时间。 HashTable线程安全，效率低一点，其内部方法基本都经过synchronized修饰，不可以有null的key和 value。默认初始容量为11，每次扩容变为原来的2n+1。创建时给定了初始容量，会直接用给定的大小。底层 数据结构为数组+链表。它基本被淘汰了，要保证线程安全可以用ConcurrentHashMap。… hashtable 和concurrentHashMap有什么区别：底层数据结构： jdk7之前的ConcurrentHashMap底层采用的是分段的数组+链表实现，jdk8之后采用的是数组+链表/红黑 树； HashTable采用的是数组+链表，数组是主体，链表是解决hash冲突存在的。 实现线程安全的方式： jdk8以前，ConcurrentHashMap采用分段锁，对整个数组进行了分段分割，每一把锁只锁容器里的一部分数 据，多线程访问不同数据段里的数据，就不会存在锁竞争，提高了并发访问；jdk8以后，直接采用数组+链表/ 红黑树，并发控制使用CAS和synchronized操作，更加提高了速度。 HashTable：所有的方法都加了锁来保证线程安全，但是效率非常的低下，当一个线程访问同步方法，另一个 线程也访问的时候，就会陷入阻塞或者轮询的状态。",
    "keyPoints": [
      " null 支持、线程安全、锁粒度、迭代一致性与性能",
      " Hashtable 整表方法同步，不应作为新代码默认选择"
    ],
    "followUps": [
      "Hashmap和Hashtable有什么不一样的？Hashmap一般怎么用？",
      "hashtable 和concurrentHashMap有什么区别？"
    ],
    "tags": [
      "Java集合",
      "HashMap",
      "Hashtable",
      "ConcurrentHashMap 对比",
      "ConcurrentHashMap",
      "HashMap、Hashtable、ConcurrentHashMap 对比"
    ],
    "sourceRef": "Java集合 PDF p.22-26：HashMap 与 Hashtable；Hashtable 原理；三类 Map 区别",
    "source": "builtin",
    "order": 88
  },
  {
    "id": "java-collections-d0143ed0a3",
    "deckId": "java-basics-sample",
    "topic": "Java集合",
    "importance": "A",
    "score": 7,
    "question": "Set 去重与有序实现应该如何理解？",
    "coreAnswer": "set集合特点：Set集合中的元素是唯一的，不会出现重复的元素。 set实现原理：Set集合通过内部的数据结构（如哈希表、红黑树等）来实现key的无重复。当向Set集合中插 入元素时，会先根据元素的hashCode值来确定元素的存储位置，然后再通过equals方法来判断是否已经存在 相同的元素，如果存在则不会再次插入，保证了元素的唯一性。 有序的 Set 是TreeSet和LinkedHashSet。TreeSet是基于红黑树实现，保证元素的自然顺序。…",
    "explanation": "Set集合有什么特点？如何实现key无重复的？：set集合特点：Set集合中的元素是唯一的，不会出现重复的元素。 set实现原理：Set集合通过内部的数据结构（如哈希表、红黑树等）来实现key的无重复。当向Set集合中插 入元素时，会先根据元素的hashCode值来确定元素的存储位置，然后再通过equals方法来判断是否已经存在 相同的元素，如果存在则不会再次插入，保证了元素的唯一性。 有序的Set是什么？记录插入顺序的集合是什么？：有序的 Set 是TreeSet和LinkedHashSet。TreeSet是基于红黑树实现，保证元素的自然顺序。 LinkedHashSet是基于双重链表和哈希表的结合来实现元素的有序存储，保证元素添加的自然顺序 记录插入顺序的集合通常指的是LinkedHashSet，它不仅保证元素的唯一性，还可以保持元素的插入顺序。 当需要在Set集合中记录元素的插入顺序时，可以选择使用LinkedHashSet来实现。 最新的图解文章都在公众号首发，别忘记关注哦！！如果你想加入百人技术交流群，扫码下方二维码回复「加 群」。",
    "keyPoints": [
      " HashSet 借助 HashMap 键去重",
      " HashSet、LinkedHashSet、TreeSet 的顺序语义和复杂度",
      "排序依赖 Comparable/Comparator"
    ],
    "followUps": [
      "有序的Set是什么？记录插入顺序的集合是什么？"
    ],
    "tags": [
      "Java集合",
      "Set 去重",
      "有序实现",
      "Set",
      "Set 去重与有序实现"
    ],
    "sourceRef": "Java集合 PDF p.27-28：Set 特点与去重；有序 Set 和插入顺序 Set",
    "source": "builtin",
    "order": 89
  },
  {
    "id": "java-concurrency-b422a44358",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "如何理解线程中断与安全停止？",
    "coreAnswer": "在 Java 中，停止线程的正确方式是 通过协作式的逻辑控制线程终止，而非强制暴力终止（如已废弃的 Thread.stop() ）。以下是实现安全停止线程的多种方法： 第一种方式：通过共享标志位主动终止。定义一个 可见的 状态变量，由主线程控制其值，工作线程循环检测该变 量以决定是否退出。…",
    "explanation": "如何停止一个线程？：在 Java 中，停止线程的正确方式是 通过协作式的逻辑控制线程终止，而非强制暴力终止（如已废弃的 Thread.stop() ）。以下是实现安全停止线程的多种方法： 第一种方式：通过共享标志位主动终止。定义一个 可见的 状态变量，由主线程控制其值，工作线程循环检测该变 量以决定是否退出。…",
    "keyPoints": [
      "说清 interrupt 是协作信号而非强制终止",
      "中断标记与 InterruptedException",
      "标记位、中断与线程池取消的安全停止模式"
    ],
    "followUps": [
      "说清 interrupt 是协作信号而非强制终止？",
      "中断标记与 InterruptedException？"
    ],
    "tags": [
      "Java并发",
      "线程中断",
      "安全停止",
      "线程中断与安全停止"
    ],
    "sourceRef": "Java并发 PDF p.16-18：如何停止一个线程",
    "source": "builtin",
    "order": 90
  },
  {
    "id": "java-synchronized-lock",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "synchronized 和 ReentrantLock 有什么区别？",
    "coreAnswer": "synchronized 和 ReentrantLock 都是 Java 中提供的可重入锁： 用法不同：synchronized 可用来修饰普通方法、静态方法和代码块，而 ReentrantLock 只能用在代码块上。 获取锁和释放锁方式不同：synchronized 会自动加锁和释放锁，当进入 synchronized 修饰的代码块之后会 自动加锁，当离开 synchronized 的代码段之后会自动释放锁。而 ReentrantLock 需要手动加锁和释放锁 锁类型不同：synchronized 属于非公平锁，而 ReentrantLock 既可以是公平锁也可以是非公平锁。…",
    "explanation": "synchronized和reentrantlock区别？：synchronized 和 ReentrantLock 都是 Java 中提供的可重入锁： 用法不同：synchronized 可用来修饰普通方法、静态方法和代码块，而 ReentrantLock 只能用在代码块上。 获取锁和释放锁方式不同：synchronized 会自动加锁和释放锁，当进入 synchronized 修饰的代码块之后会 自动加锁，当离开 synchronized 的代码段之后会自动释放锁。而 ReentrantLock 需要手动加锁和释放锁 锁类型不同：synchronized 属于非公平锁，而 ReentrantLock 既可以是公平锁也可以是非公平锁。 响应中断不同：ReentrantLock 可以响应中断，解决死锁的问题，而 synchronized 不能响应中断。 底层实现不同：synchronized 是 JVM 层面通过监视器实现的，而 ReentrantLock 是基于 AQS 实现的。",
    "keyPoints": [
      "语法级与 API 级、自动与手动释放、可中断、超时、公平性、多 Condition",
      "能根据需求选型并说出 finally 解锁要求"
    ],
    "followUps": [
      "语法级与 API 级、自动与手动释放、可中断、超时、公平性、多 Condition？",
      "能根据需求选型并说出 finally 解锁要求？"
    ],
    "tags": [
      "Java并发",
      "synchronized",
      "ReentrantLock 选型",
      "ReentrantLock",
      "synchronized 与 ReentrantLock 选型"
    ],
    "sourceRef": "Java并发 PDF p.27-29：synchronized 和 ReentrantLock 的区别及应用场景；还有哪些线程同步方法",
    "source": "builtin",
    "order": 91
  },
  {
    "id": "java-concurrency-261ecf8fd3",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "如何理解死锁条件、定位与预防？",
    "coreAnswer": "死锁只有同时满足以下四个条件才会发生： 互斥条件：互斥条件是指多个线程不能同时使用同一个资源。 持有并等待条件：持有并等待条件是指，当线程 A 已经持有了资源 1，又想申请资源 2，而资源 2 已经被线程 C 持有了，所以线程 A 就会处于等待状态，但是线程 A 在等待资源 2 的同时并不会释放自己已经持有的资源 1。 不可剥夺条件：不可剥夺条件是指，当线程已经持有了资源 ，在自己使用完之前不能被其他线程获取，线程 B 如果也想使用此资源，则只能在线程 A 使用完并释放后才能获取。 环路等待条件：环路等待条件指的是，在死锁发生的时候，两个线程获取资源的顺序构成了环形链。…",
    "explanation": "什么情况会产生死锁问题？如何解决？：死锁只有同时满足以下四个条件才会发生： 互斥条件：互斥条件是指多个线程不能同时使用同一个资源。 持有并等待条件：持有并等待条件是指，当线程 A 已经持有了资源 1，又想申请资源 2，而资源 2 已经被线程 C 持有了，所以线程 A 就会处于等待状态，但是线程 A 在等待资源 2 的同时并不会释放自己已经持有的资源 1。 不可剥夺条件：不可剥夺条件是指，当线程已经持有了资源 ，在自己使用完之前不能被其他线程获取，线程 B 如果也想使用此资源，则只能在线程 A 使用完并释放后才能获取。 环路等待条件：环路等待条件指的是，在死锁发生的时候，两个线程获取资源的顺序构成了环形链。 例如，线程 A 持有资源 R1 并试图获取资源 R2，而线程 B 持有资源 R2 并试图获取资源 R1，此时两个线程相互等 待对方释放资源，从而导致死锁。…",
    "keyPoints": [
      "说出互斥、请求保持、不可剥夺、循环等待四条件",
      "能用统一加锁顺序、超时锁避免，并用线程 dump 识别循环等待"
    ],
    "followUps": [
      "说出互斥、请求保持、不可剥夺、循环等待四条件？",
      "能用统一加锁顺序、超时锁避免，并用线程 dump 识别循环等待？"
    ],
    "tags": [
      "Java并发",
      "死锁条件",
      "定位",
      "预防",
      "死锁条件、定位与预防"
    ],
    "sourceRef": "Java并发 PDF p.43：什么情况产生死锁，如何解决",
    "source": "builtin",
    "order": 92
  },
  {
    "id": "java-concurrency-41b531cd74",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "如何理解线程池容量评估、队列与拒绝策略？",
    "coreAnswer": "当线程池的任务队列满了之后，线程池会执行指定的拒绝策略来应对，常用的四种拒绝策略包括： CallerRunsPolicy、AbortPolicy、DiscardPolicy、DiscardOldestPolicy，此外，还可以通过实现 RejectedExecutionHandler接口来自定义拒绝策略。 四种预置的拒绝策略： CallerRunsPolicy，使用线程池的调用者所在的线程去执行被拒绝的任务，除非线程池被停止或者线程池的任 务队列已有空缺。 AbortPolicy，直接抛出一个任务被线程池拒绝的异常。 DiscardPolicy，不做任何处理，静默拒绝提交的任务。…",
    "explanation": "线程池工作队列满了有哪些拒接策略？：当线程池的任务队列满了之后，线程池会执行指定的拒绝策略来应对，常用的四种拒绝策略包括： CallerRunsPolicy、AbortPolicy、DiscardPolicy、DiscardOldestPolicy，此外，还可以通过实现 RejectedExecutionHandler接口来自定义拒绝策略。 四种预置的拒绝策略： CallerRunsPolicy，使用线程池的调用者所在的线程去执行被拒绝的任务，除非线程池被停止或者线程池的任 务队列已有空缺。 AbortPolicy，直接抛出一个任务被线程池拒绝的异常。 DiscardPolicy，不做任何处理，静默拒绝提交的任务。 DiscardOldestPolicy，抛弃最老的任务，然后执行该任务。 自定义拒绝策略，通过实现接口可以自定义任务拒绝策略。 有线程池参数设置的经验吗？：核心线程数（corePoolSize）设置的经验： CPU密集型：corePoolSize = CPU核数 + 1（避免过多线程竞争CPU） IO密集型：corePoolSize = CPU核数 x 2（或更高，具体看IO等待时间） 场景一：电商场景，特点瞬时高并发、任务处理时间短，线程池的配置可设置如下： new ThreadPoolExecutor( 16, // corePoolSize = 16（假设8核CPU × 2） 32, // maximumPoolSize = 32（突发流量扩容） 10, TimeUnit.SECONDS, // 非核心线程空闲10秒回收 new SynchronousQueue<>(), // 不缓存任务，直接扩容线程 new AbortPolicy() // 直接拒绝，避免系统过载 ); 说明： 使用 SynchronousQueue 确保任务直达线程，避免队列延迟。… 核心线程数设置为0可不可以？：可以，当核心线程数为0的时候，会创建一个非核心线程进行执行。 从下面的源码也可以看到，当核心线程数为 0 时，来了一个任务之后，会先将任务添加到任务队列，同时也会判断 当前工作的线程数是否为 0，如果为 0，则会创建线程来执行线程池的任务。",
    "keyPoints": [
      "能根据 CPU/IO 比例、任务耗时、目标吞吐和下游容量估算并通过压测校准",
      "有界/无界队列与四种拒绝策略"
    ],
    "followUps": [
      "有线程池参数设置的经验吗？",
      "核心线程数设置为0可不可以？"
    ],
    "tags": [
      "Java并发",
      "线程池容量评估",
      "队列",
      "拒绝策略",
      "线程池容量评估、队列与拒绝策略"
    ],
    "sourceRef": "Java并发 PDF p.46-48：队列满后的拒绝策略；线程池参数设置；核心线程数能否为 0",
    "source": "builtin",
    "order": 93
  },
  {
    "id": "java-concurrency-1ad379ab15",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "线程创建方式与 start 启动语义应该如何理解？",
    "coreAnswer": "1.继承Thread类 这是最直接的一种方式，用户自定义类继承java.lang.Thread类，重写其run()方法，run()方法中定义了线程执行的 具体任务。创建该类的实例后，通过调用start()方法启动线程。…",
    "explanation": "线程的创建方式有哪些?：1.继承Thread类 这是最直接的一种方式，用户自定义类继承java.lang.Thread类，重写其run()方法，run()方法中定义了线程执行的 具体任务。创建该类的实例后，通过调用start()方法启动线程。… 怎么启动线程 ？：启动线程的通过Thread类的start()。 //创建两个线程，用start启动线程 MyThread myThread1 = new MyThread(); MyThread myThread2 = new MyThread(); myThread1.start(); myThread2.start();",
    "keyPoints": [
      " Thread、Runnable、Callable/Future 与线程池",
      "“提交任务”与“创建线程”",
      " start 只能调用一次且不等于普通 run 方法调用"
    ],
    "followUps": [
      "怎么启动线程 ？"
    ],
    "tags": [
      "Java并发",
      "线程创建方式与 start 启动语义",
      "start"
    ],
    "sourceRef": "Java并发 PDF p.2-5：线程有哪些创建方式；怎么启动线程",
    "source": "builtin",
    "order": 94
  },
  {
    "id": "java-concurrency-bb7185c6a7",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "Java 线程状态与 sleep/wait 区别是什么？",
    "coreAnswer": "源自《Java并发编程艺术》 java.lang.Thread.State枚举类中定义了六种线程的状态，可以调用线程Thread中的 getState()方法获取当前线程的状态。…",
    "explanation": "Java线程的状态有哪些？：源自《Java并发编程艺术》 java.lang.Thread.State枚举类中定义了六种线程的状态，可以调用线程Thread中的 getState()方法获取当前线程的状态。 线程状态 NEW 解释 尚未启动的线程状态，即线程创建，还未调用start方法 RUNNABLE 就绪状态（调用start，等待调度）+正在运行 BLOCKED WAITING 等待监视器锁时，陷入阻塞状态 等待状态的线程正在等待另一线程执行特定的操作（如notify） TIMED_WAITING 具有指定等待时间的等待状态 TERMINATED 线程完成执行，终止状态 sleep 和 wait的区别是什么？：对比例表： 特性 所属类 锁释放 sleep() wait() Thread 类（静态方法） Object 类（实例方法） ❌ ✅ 使用前提 任意位置调用 必须在同步块内（持有锁） 唤醒机制 超时自动恢复 需 notify() / notifyAll() 或超时 设计用途 暂停线程执行，不涉及锁协作 线程间协调，释放锁让其他线程工作 所属分类的不同：sleep 是 Thread 类的静态方法，可以在任何地方直接通过 Thread.sleep() 调用，无需 依赖对象实例。wait 是 Object 类的实例方法，这意味着必须通过对象实例来调用。 锁释放的情况： Thread.sleep() 在调用时，线程会暂停执行指定的时间，但不会释放持有的对象锁。也就是 说，在 sleep 期间，其他线程无法获得该线程持有的锁。… blocked和waiting有啥区别：区别如下： 触发条件:线程进入BLOCKED状态通常是因为试图获取一个对象的锁（monitor lock），但该锁已经被另一个 线程持有。这通常发生在尝试进入synchronized块或方法时，如果锁已被占用，则线程将被阻塞直到锁可 用。线程进入WAITING状态是因为它正在等待另一个线程执行某些操作，例如调用Object.wait()方法、 Thread.join()方法或LockSupport.park()方法。在这种状态下，线程将不会消耗CPU资源，并且不会参与锁的 竞争。 唤醒机制:当一个线程被阻塞等待锁时，一旦锁被释放，线程将有机会重新尝试获取锁。如果锁此时未被其他 线程获取，那么线程可以从BLOCKED状态变为RUNNABLE状态。线程在WAITING状态中需要被显式唤醒。…",
    "keyPoints": [
      "说出六种 Java 线程状态及典型转换",
      " sleep 与 wait 的归属类、锁释放、唤醒方式和使用前提",
      " BLOCKED 与 WAITING"
    ],
    "followUps": [
      "sleep 和 wait的区别是什么？",
      "blocked和waiting有啥区别？"
    ],
    "tags": [
      "Java并发",
      "Java 线程状态与 sleep",
      "wait 区别",
      "Java",
      "sleep",
      "wait"
    ],
    "sourceRef": "Java并发 PDF p.5-8：Java 线程状态；sleep 和 wait 的区别；BLOCKED 和 WAITING 的区别",
    "source": "builtin",
    "order": 95
  },
  {
    "id": "java-concurrency-80df02adad",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "如何理解线程通信与 wait/notify 协作？",
    "coreAnswer": "线程从 等待（WAIT） 状态恢复到 运行（RUNNING） 状态的核心机制是 通过外部事件触发或资源可用性变化，比 如等待的线程被其他线程对象唤醒， notify() 和 notifyAll() 。 synchronized (lock) { // 线程进入等待状态，释放锁 lock.wait(); } // 其他线程调用以下代码唤醒等待线程 synchronized (lock) { lock.notify(); // 唤醒单个线程 // lock.notifyAll(); // 唤醒所有等待线程 } 同样是唤醒等待的线程，同样最多只有一个线程能获得锁，同样不能控制哪个线程获得锁。…",
    "explanation": "wait 状态下的线程如何进行恢复到 running 状态?：线程从 等待（WAIT） 状态恢复到 运行（RUNNING） 状态的核心机制是 通过外部事件触发或资源可用性变化，比 如等待的线程被其他线程对象唤醒， notify() 和 notifyAll() 。 synchronized (lock) { // 线程进入等待状态，释放锁 lock.wait(); } // 其他线程调用以下代码唤醒等待线程 synchronized (lock) { lock.notify(); // 唤醒单个线程 // lock.notifyAll(); // 唤醒所有等待线程 } notify 和 notifyAll 的区别?：同样是唤醒等待的线程，同样最多只有一个线程能获得锁，同样不能控制哪个线程获得锁。 区别在于： notify：唤醒一个线程，其他线程依然处于wait的等待唤醒状态，如果被唤醒的线程结束时没调用notify，其 他线程就永远没人去唤醒，只能等待超时，或者被中断 notifyAll：所有线程退出wait的状态，开始竞争锁，但只有一个线程能抢到，这个线程执行完后，其他线程又 会有一个幸运儿脱颖而出得到锁 线程间通信方式有哪些？：1、Object 类的 wait()、notify() 和 notifyAll() 方法。这是 Java 中最基础的线程间通信方式，基于对象的监视器 （锁）机制。 wait() ：使当前线程进入等待状态，直到其他线程调用该对象的 notify() 或 notifyAll() 方法。 notify() ：唤醒在此对象监视器上等待的单个线程。 notifyAll() ：唤醒在此对象监视器上等待的所有线程。…",
    "keyPoints": [
      " wait/notify 必须持有同一监视器，用 while 重检条件",
      " notify 与 notifyAll 及唤醒选择的不确定性",
      " join、Condition、阻塞队列等协作方式"
    ],
    "followUps": [
      "notify 和 notifyAll 的区别?",
      "线程间通信方式有哪些？"
    ],
    "tags": [
      "Java并发",
      "线程通信与 wait",
      "notify 协作",
      "wait",
      "notify",
      "线程通信与 wait/notify 协作"
    ],
    "sourceRef": "Java并发 PDF p.8-15：WAITING 如何恢复；notify 和 notifyAll；线程间如何通信",
    "source": "builtin",
    "order": 96
  },
  {
    "id": "java-concurrency-3264e1f90a",
    "deckId": "java-basics-sample",
    "topic": "Java并发",
    "importance": "A",
    "score": 7,
    "question": "Java 常用锁的分类与场景选型是什么？",
    "coreAnswer": "Java中的锁是用于管理多线程并发访问共享资源的关键机制。锁可以确保在任意给定时间内只有一个线程可以访问 特定的资源，从而避免数据竞争和不一致性。Java提供了多种锁机制，可以分为以下几类： 内置锁（synchronized）：Java中的 synchronized 关键字是内置锁机制的基础，可以用于方法或代码块。 当一个线程进入 synchronized 代码块或方法时，它会获取关联对象的锁；当线程离开该代码块或方法时，锁 会被释放。如果其他线程尝试获取同一个对象的锁，它们将被阻塞，直到锁被释放。其中，syncronized加锁 时有无锁、偏向锁、轻量级锁和重量级锁几个级别。…",
    "explanation": "Java中有哪些常用的锁，在什么场景下使用？：Java中的锁是用于管理多线程并发访问共享资源的关键机制。锁可以确保在任意给定时间内只有一个线程可以访问 特定的资源，从而避免数据竞争和不一致性。Java提供了多种锁机制，可以分为以下几类： 内置锁（synchronized）：Java中的 synchronized 关键字是内置锁机制的基础，可以用于方法或代码块。 当一个线程进入 synchronized 代码块或方法时，它会获取关联对象的锁；当线程离开该代码块或方法时，锁 会被释放。如果其他线程尝试获取同一个对象的锁，它们将被阻塞，直到锁被释放。其中，syncronized加锁 时有无锁、偏向锁、轻量级锁和重量级锁几个级别。偏向锁用于当一个线程进入同步块时，如果没有任何其 他线程竞争，就会使用偏向锁，以减少锁的开销。轻量级锁使用线程栈上的数据结构，避免了操作系统级别 的锁。重量级锁则涉及操作系统级的互斥锁。… 怎么在实践中用锁的？：Java提供了多种锁的实现，包括 synchronized 关键字、 java.util.concurrent.locks 包下的 Lock 接口及其具体 实现如 ReentrantLock 、 ReadWriteLock 等。下面我们来看看这些锁的使用方式。 1. synchronized synchronized 关键字可以用于方法或代码块，它是Java中最早的锁实现，使用起来非常简单。…",
    "keyPoints": [
      "独占/共享、乐观/悲观、可重入、公平性分类",
      " synchronized、ReentrantLock、ReadWriteLock 的使用条件和代价"
    ],
    "followUps": [
      "怎么在实践中用锁的？"
    ],
    "tags": [
      "Java并发",
      "Java 常用锁的分类",
      "场景选型",
      "Java",
      "Java 常用锁的分类与场景选型"
    ],
    "sourceRef": "Java并发 PDF p.21-23：Java 常用哪些锁，各在什么场景使用；实践中怎么用锁",
    "source": "builtin",
    "order": 97
  },
  {
    "id": "java-jvm-fdbe354736",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "堆与栈的区别是什么？",
    "coreAnswer": "用途：栈主要用于存储局部变量、方法调用的参数、方法返回地址以及一些临时数据。每当一个方法被调 用，一个栈帧（stack frame）就会在栈中创建，用于存储该方法的信息，当方法执行完毕，栈帧也会被移 除。堆用于存储对象的实例（包括类的实例和数组）。当你使用 new 关键字创建一个对象时，对象的实例就 会在堆上分配空间。 生命周期：栈中的数据具有确定的生命周期，当一个方法调用结束时，其对应的栈帧就会被销毁，栈中存储 的局部变量也会随之消失。堆中的对象生命周期不确定，对象会在垃圾回收机制（Garbage Collection, GC） 检测到对象不再被引用时才被回收。…",
    "explanation": "JVM内存模型里的堆和栈有什么区别？：用途：栈主要用于存储局部变量、方法调用的参数、方法返回地址以及一些临时数据。每当一个方法被调 用，一个栈帧（stack frame）就会在栈中创建，用于存储该方法的信息，当方法执行完毕，栈帧也会被移 除。堆用于存储对象的实例（包括类的实例和数组）。当你使用 new 关键字创建一个对象时，对象的实例就 会在堆上分配空间。 生命周期：栈中的数据具有确定的生命周期，当一个方法调用结束时，其对应的栈帧就会被销毁，栈中存储 的局部变量也会随之消失。堆中的对象生命周期不确定，对象会在垃圾回收机制（Garbage Collection, GC） 检测到对象不再被引用时才被回收。 存取速度：栈的存取速度通常比堆快，因为栈遵循先进后出（LIFO, Last In First Out）的原则，操作简单快 速。堆的存取速度相对较慢，因为对象在堆上的分配和回收需要更多的时间，而且垃圾回收机制的运行也会 影响性能。…",
    "keyPoints": [
      "线程归属、生命周期、存储内容、空间管理和典型异常五个维度比较",
      "判断位置时按声明语境说明：实例字段随对象在堆，方法局部值或引用在栈帧局部变量表，静态字段需区分规范逻辑与具体 JVM 实现"
    ],
    "followUps": [
      "线程归属、生命周期、存储内容、空间管理和典型异常五个维度比较？",
      "判断位置时按声明语境说明：实例字段随对象在堆，方法局部值或引用在栈帧局部变量表，静态字段需区分规范逻辑与具体 JVM 实现？"
    ],
    "tags": [
      "JVM",
      "栈的区别",
      "堆与栈的区别"
    ],
    "sourceRef": "JVM PDF p.2：JVM 内存模型里的堆和栈有什么区别",
    "source": "builtin",
    "order": 98
  },
  {
    "id": "java-jvm-ab68391dfc",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "如何理解类加载器与双亲委派？",
    "coreAnswer": "启动类加载器（Bootstrap Class Loader）：这是最顶层的类加载器，负责加载Java的核心库（如位于 jre/lib/rt.jar中的类），它是用C++编写的，是JVM的一部分。启动类加载器无法被Java程序直接引用。 扩展类加载器（Extension Class Loader）：它是Java语言实现的，继承自ClassLoader类，负责加载Java扩 展目录（jre/lib/ext或由系统变量Java.ext.dirs指定的目录）下的jar包和类库。扩展类加载器由启动类加载器 加载，并且父加载器就是启动类加载器。…",
    "explanation": "类加载器有哪些？：启动类加载器（Bootstrap Class Loader）：这是最顶层的类加载器，负责加载Java的核心库（如位于 jre/lib/rt.jar中的类），它是用C++编写的，是JVM的一部分。启动类加载器无法被Java程序直接引用。 扩展类加载器（Extension Class Loader）：它是Java语言实现的，继承自ClassLoader类，负责加载Java扩 展目录（jre/lib/ext或由系统变量Java.ext.dirs指定的目录）下的jar包和类库。扩展类加载器由启动类加载器 加载，并且父加载器就是启动类加载器。 系统类加载器（System Class Loader）/ 应用程序类加载器（Application Class Loader）：这也是Java语 言实现的，负责加载用户类路径（ClassPath）上的指定类库，是我们平时编写Java程序时默认使用的类加载 器。系统类加载器的父加载器是扩展类加载器。… 双亲委派模型的作用：保证类的唯一性：通过委托机制，确保了所有加载请求都会传递到启动类加载器，避免了不同类加载器重复 加载相同类的情况，保证了Java核心类库的统一性，也防止了用户自定义类覆盖核心类库的可能。 保证安全性：由于Java核心库被启动类加载器加载，而启动类加载器只加载信任的类路径中的类，这样可以防 止不可信的类假冒核心类，增强了系统的安全性。例如，恶意代码无法自定义一个Java.lang.System类并加载 到JVM中，因为这个请求会被委托给启动类加载器，而启动类加载器只会加载标准的Java库中的类。 支持隔离和层次划分：双亲委派模型支持不同层次的类加载器服务于不同的类加载需求，如应用程序类加载 器加载用户代码，扩展类加载器加载扩展框架，启动类加载器加载核心库。这种层次化的划分有助于实现沙 箱安全机制，保证了各个层级类加载器的职责清晰，也便于维护和扩展。…",
    "keyPoints": [
      "能说出启动类、平台类和应用类加载器的层次，完整描述委派与查找方向，并说明避免重复加载、保护核心类及典型打破场景"
    ],
    "followUps": [
      "双亲委派模型的作用？"
    ],
    "tags": [
      "JVM",
      "类加载器",
      "双亲委派",
      "类加载器与双亲委派"
    ],
    "sourceRef": "JVM PDF p.10-12：类加载器有哪些；双亲委派模型的作用",
    "source": "builtin",
    "order": 99
  },
  {
    "id": "java-jvm-9867dd1113",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "常见垃圾回收器及 CMS、G1 对比是什么？",
    "coreAnswer": "Serial收集器（复制算法): 新生代单线程收集器，标记和清理都是单线程，优点是简单高效； ParNew收集器 (复制算法): 新生代收并行集器，实际上是Serial收集器的多线程版本，在多核CPU环境下有着 比Serial更好的表现； Parallel Scavenge收集器 (复制算法): 新生代并行收集器，追求高吞吐量，高效利用 CPU。吞吐量 = 用户线程 时间/(用户线程时间+GC线程时间)，高吞吐量可以高效率的利用CPU时间，尽快完成程序的运算任务，适合后 台应用等对交互相应要求不高的场景； Serial Old收集器 (标记-整理算法): 老年代单线程收集器，Serial收集器的老年代版本；…",
    "explanation": "垃圾回收器有哪些？：Serial收集器（复制算法): 新生代单线程收集器，标记和清理都是单线程，优点是简单高效； ParNew收集器 (复制算法): 新生代收并行集器，实际上是Serial收集器的多线程版本，在多核CPU环境下有着 比Serial更好的表现； Parallel Scavenge收集器 (复制算法): 新生代并行收集器，追求高吞吐量，高效利用 CPU。吞吐量 = 用户线程 时间/(用户线程时间+GC线程时间)，高吞吐量可以高效率的利用CPU时间，尽快完成程序的运算任务，适合后 台应用等对交互相应要求不高的场景； Serial Old收集器 (标记-整理算法): 老年代单线程收集器，Serial收集器的老年代版本； Parallel Old收集器 (标记-整理算法)： 老年代并行收集器，吞吐量优先，Parallel Scavenge收集器的老年代版 本；… 垃圾回收器 CMS 和 G1的区别？：区别一：使用的范围不一样： CMS收集器是老年代的收集器，可以配合新生代的Serial和ParNew收集器一起使用 G1收集器收集范围是老年代和新生代。不需要结合其他收集器使用 区别二：STW的时间： CMS收集器以最小的停顿时间为目标的收集器。 G1收集器可预测垃圾回收 (opens new window)的停顿时间（建立可预测的停顿时间模型） 区别三： 垃圾碎片 CMS收集器是使用“标记-清除”算法进行的垃圾回收，容易产生内存碎片 G1收集器使用的是“标记-整理”算法，进行了空间整合，没有内存空间碎片。…",
    "keyPoints": [
      "能按串行、吞吐、低延迟目标归类常见回收器，重点比较 CMS 与 G1 的内存布局、回收阶段、停顿目标、缺点和适用条件"
    ],
    "followUps": [
      "垃圾回收器 CMS 和 G1的区别？"
    ],
    "tags": [
      "JVM",
      "常见垃圾回收器及 CMS",
      "G1 对比",
      "CMS",
      "G1",
      "常见垃圾回收器及 CMS、G1 对比"
    ],
    "sourceRef": "JVM PDF p.15-18：垃圾回收器有哪些；CMS 和 G1 的区别；什么情况下使用 CMS 或 G1",
    "source": "builtin",
    "order": 100
  },
  {
    "id": "java-jvm-90b46ea763",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "如何理解Minor GC、Major GC、Full GC 与触发条件？",
    "coreAnswer": "在Java中，垃圾回收机制是自动管理内存的重要组成部分。根据其作用范围和触发条件的不同，可以将GC分为三种 类型：Minor GC（也称为Young GC）、Major GC（有时也称为Old GC）、以及Full GC。以下是这三种GC的区别 和触发场景： Minor GC (Young GC) 作用范围：只针对年轻代进行回收，包括Eden区和两个Survivor区（S0和S1）。 触发条件：当Eden区空间不足时，JVM会触发一次Minor GC，将Eden区和一个Survivor区中的存活对象移动 到另一个Survivor区或老年代（Old Generation）。…",
    "explanation": "minorGC、majorGC、fullGC的区别，什么场景触发full GC：在Java中，垃圾回收机制是自动管理内存的重要组成部分。根据其作用范围和触发条件的不同，可以将GC分为三种 类型：Minor GC（也称为Young GC）、Major GC（有时也称为Old GC）、以及Full GC。以下是这三种GC的区别 和触发场景： Minor GC (Young GC) 作用范围：只针对年轻代进行回收，包括Eden区和两个Survivor区（S0和S1）。 触发条件：当Eden区空间不足时，JVM会触发一次Minor GC，将Eden区和一个Survivor区中的存活对象移动 到另一个Survivor区或老年代（Old Generation）。 特点：通常发生得非常频繁，因为年轻代中对象的生命周期较短，回收效率高，暂停时间相对较短。 Major GC 作用范围：主要针对老年代进行回收，但不一定只回收老年代。…",
    "keyPoints": [
      "能先声明三者并非 JVM 规范统一术语，Major GC 尤其依赖收集器与日志口径",
      "再在明确的 JDK、收集器和日志语境中解释回收范围、停顿特征及常见触发条件"
    ],
    "followUps": [
      "能先声明三者并非 JVM 规范统一术语，Major GC 尤其依赖收集器与日志口径？",
      "再在明确的 JDK、收集器和日志语境中解释回收范围、停顿特征及常见触发条件？"
    ],
    "tags": [
      "JVM",
      "Minor GC",
      "Major GC",
      "Full GC 与触发条件",
      "Minor",
      "GC"
    ],
    "sourceRef": "JVM PDF p.17：minorGC、majorGC、fullGC 的区别，什么场景触发 full GC",
    "source": "builtin",
    "order": 101
  },
  {
    "id": "java-jvm-79293bb679",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "如何理解堆的分代与大对象分配？",
    "coreAnswer": "Java堆（Heap）是Java虚拟机（JVM）中内存管理的一个重要区域，主要用于存放对象实例和数组。随着JVM的发 展和不同垃圾收集器的实现，堆的具体划分可能会有所不同，但通常可以分为以下几个部分： 新生代（Young Generation）:新生代分为Eden Space和Survivor Space。在Eden Space中， 大多数新创 建的对象首先存放在这里。Eden区相对较小，当Eden区满时，会触发一次Minor GC（新生代垃圾回收）。 在Survivor Spaces中，通常分为两个相等大小的区域，称为S0（Survivor 0）和S1（Survivor 1）。…",
    "explanation": "堆分为哪几部分呢？：Java堆（Heap）是Java虚拟机（JVM）中内存管理的一个重要区域，主要用于存放对象实例和数组。随着JVM的发 展和不同垃圾收集器的实现，堆的具体划分可能会有所不同，但通常可以分为以下几个部分： 新生代（Young Generation）:新生代分为Eden Space和Survivor Space。在Eden Space中， 大多数新创 建的对象首先存放在这里。Eden区相对较小，当Eden区满时，会触发一次Minor GC（新生代垃圾回收）。 在Survivor Spaces中，通常分为两个相等大小的区域，称为S0（Survivor 0）和S1（Survivor 1）。在每次 Minor GC后，存活下来的对象会被移动到其中一个Survivor空间，以继续它们的生命周期。这两个区域轮流 充当对象的中转站，帮助区分短暂存活的对象和长期存活的对象。… 如果有个大对象一般是在哪个区域？：大对象通常会直接分配到老年代。 新生代主要用于存放生命周期较短的对象，并且其内存空间相对较小。如果将大对象分配到新生代，可能会很快导 致新生代空间不足，从而频繁触发 Minor GC。而每次 Minor GC 都需要进行对象的复制和移动操作，这会带来一 定的性能开销。将大对象直接分配到老年代，可以减少新生代的内存压力，降低 Minor GC 的频率。 大对象通常需要连续的内存空间，如果在新生代中频繁分配和回收大对象，容易产生内存碎片，导致后续分配大对 象时可能因为内存不连续而失败。老年代的空间相对较大，更适合存储大对象，有助于减少内存碎片的产生。",
    "keyPoints": [
      "新生代、老年代及 Eden、Survivor 的关系，描述常见对象分配与晋升路径，并解释大对象为何可能直接进入老年代"
    ],
    "followUps": [
      "如果有个大对象一般是在哪个区域？"
    ],
    "tags": [
      "JVM",
      "堆的分代",
      "大对象分配",
      "堆的分代与大对象分配"
    ],
    "sourceRef": "JVM PDF p.3-4：堆分为哪几部分；大对象一般在哪个区域",
    "source": "builtin",
    "order": 102
  },
  {
    "id": "java-jvm-12b7eed883",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "如何理解对象创建过程与生命周期？",
    "coreAnswer": "在Java中创建对象的过程包括以下几个步骤： 1. 类加载检查：虚拟机遇到一条 new 指令时，首先将去检查这个指令的参数是否能在常量池中定位到一个类的 符号引用，并且检查这个符号引用代表的类是否已被加载过、解析和初始化过。如果没有，那必须先执行相 应的类加载过程。 2. 分配内存：在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需的内存大小在类加载完成 后便可确定，为对象分配空间的任务等同于把一块确定大小的内存从 Java 堆中划分出来。…",
    "explanation": "创建对象的过程？：在Java中创建对象的过程包括以下几个步骤： 1. 类加载检查：虚拟机遇到一条 new 指令时，首先将去检查这个指令的参数是否能在常量池中定位到一个类的 符号引用，并且检查这个符号引用代表的类是否已被加载过、解析和初始化过。如果没有，那必须先执行相 应的类加载过程。 2. 分配内存：在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需的内存大小在类加载完成 后便可确定，为对象分配空间的任务等同于把一块确定大小的内存从 Java 堆中划分出来。 3. 初始化零值：内存分配完成后，虚拟机需要将分配到的内存空间都初始化为零值（不包括对象头），这一步 操作保证了对象的实例字段在 Java 代码中可以不赋初始值就直接使用，程序能访问到这些字段的数据类型所 对应的零值。… 对象的生命周期：对象的生命周期包括创建、使用和销毁三个阶段： 创建：对象通过关键字new在堆内存中被实例化，构造函数被调用，对象的内存空间被分配。 使用：对象被引用并执行相应的操作，可以通过引用访问对象的属性和方法，在程序运行过程中被不断使 用。 销毁：当对象不再被引用时，通过垃圾回收机制自动回收对象所占用的内存空间。垃圾回收器会在适当的时 候检测并回收不再被引用的对象，释放对象占用的内存空间，完成对象的销毁过程。",
    "keyPoints": [
      "类检查、内存分配、零值、对象头、构造初始化讲到可达、不可达与回收，说明指针碰撞和空闲列表分别适用的前提"
    ],
    "followUps": [
      "对象的生命周期？"
    ],
    "tags": [
      "JVM",
      "对象创建过程",
      "生命周期",
      "对象创建过程与生命周期"
    ],
    "sourceRef": "JVM PDF p.9-10：创建对象的过程；对象的生命周期",
    "source": "builtin",
    "order": 103
  },
  {
    "id": "java-jvm-0895a77e8f",
    "deckId": "java-basics-sample",
    "topic": "JVM",
    "importance": "A",
    "score": 7,
    "question": "如何理解各运行时区域的 OOM 与 StackOverflowError？",
    "coreAnswer": "堆内存溢出：当出现Java.lang.OutOfMemoryError:Java heap space异常时，就是堆内存溢出了。原因是代 码中可能存在大对象分配，或者发生了内存泄露，导致在多次GC之后，还是无法找到一块足够大的内存容纳 当前对象。 栈溢出：如果我们写一段程序不断的进行递归调用，而且没有退出条件，就会导致不断地进行压栈。类似这 种情况，JVM 实际会抛出 StackOverFlowError；当然，如果 JVM 试图去扩展栈空间的的时候失败，则会抛出 OutOfMemoryError。 元空间溢出：元空间的溢出，系统会抛出Java.lang.OutOfMemoryError: Metaspace。…",
    "explanation": "jvm 内存结构有哪几种内存溢出的情况？：堆内存溢出：当出现Java.lang.OutOfMemoryError:Java heap space异常时，就是堆内存溢出了。原因是代 码中可能存在大对象分配，或者发生了内存泄露，导致在多次GC之后，还是无法找到一块足够大的内存容纳 当前对象。 栈溢出：如果我们写一段程序不断的进行递归调用，而且没有退出条件，就会导致不断地进行压栈。类似这 种情况，JVM 实际会抛出 StackOverFlowError；当然，如果 JVM 试图去扩展栈空间的的时候失败，则会抛出 OutOfMemoryError。 元空间溢出：元空间的溢出，系统会抛出Java.lang.OutOfMemoryError: Metaspace。出现这个异常的问题 的原因是系统的代码非常多或引用的第三方包非常多或者通过动态代码生成类加载等方法，导致元空间的内 存占用很大。…",
    "keyPoints": [
      "能把堆、栈、元空间和直接内存压力映射到典型异常与常见原因，并区分栈深度溢出和内存申请失败"
    ],
    "followUps": [
      "能把堆、栈、元空间和直接内存压力映射到典型异常与常见原因，并区分栈深度溢出和内存申请失败？"
    ],
    "tags": [
      "JVM",
      "各运行时区域的 OOM",
      "StackOverflowError",
      "OOM",
      "各运行时区域的 OOM 与 StackOverflowError"
    ],
    "sourceRef": "JVM PDF p.7：JVM 内存结构有哪几种内存溢出的情况",
    "source": "builtin",
    "order": 104
  },
  {
    "id": "java-spring-6ff6fdbcb6",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "如何理解Spring 框架定位与核心思想？",
    "coreAnswer": "Spring框架核心特性包括： IoC容器：Spring通过控制反转实现了对象的创建和对象间的依赖关系管理。开发者只需要定义好Bean及其依 赖关系，Spring容器负责创建和组装这些对象。 AOP：面向切面编程，允许开发者定义横切关注点，例如事务管理、安全控制等，独立于业务逻辑的代码。 通过AOP，可以将这些关注点模块化，提高代码的可维护性和可重用性。 事务管理：Spring提供了一致的事务管理接口，支持声明式和编程式事务。开发者可以轻松地进行事务管 理，而无需关心具体的事务API。 MVC框架：Spring MVC是一个基于Servlet API构建的Web框架，采用了模型-视图-控制器（MVC）架构。…",
    "explanation": "说一下你对 Spring 的理解：Spring框架核心特性包括： IoC容器：Spring通过控制反转实现了对象的创建和对象间的依赖关系管理。开发者只需要定义好Bean及其依 赖关系，Spring容器负责创建和组装这些对象。 AOP：面向切面编程，允许开发者定义横切关注点，例如事务管理、安全控制等，独立于业务逻辑的代码。 通过AOP，可以将这些关注点模块化，提高代码的可维护性和可重用性。 事务管理：Spring提供了一致的事务管理接口，支持声明式和编程式事务。开发者可以轻松地进行事务管 理，而无需关心具体的事务API。 MVC框架：Spring MVC是一个基于Servlet API构建的Web框架，采用了模型-视图-控制器（MVC）架构。它 支持灵活的URL到页面控制器的映射，以及多种视图技术。 spring的核心思想说说你的理解？：核心思 想 IOC 解决的问题 实现手段 典型应用场景 对象创建与依赖管理的高耦 合 容器管理Bean生命周期 动态替换数据库实现、服务组装 DI 依赖关系的硬编码问题 Setter/构造器/注解注 入 注入数据源、服务层依赖DAO 层 AOP 横切逻辑分散在业务代码中 动态代理与切面配置 日志、事务、权限校验统一处理 Spring通过这IOC、DI、AOP三大核心思想，实现了轻量级、高内聚低耦合的企业级应用开发框架，成为Java生态 中不可或缺的基石。",
    "keyPoints": [
      "能用一句话说明 Spring 解决什么问题，概括 IoC、DI、AOP、事务与 MVC 的职责，并解释低耦合和可测试性如何体现"
    ],
    "followUps": [
      "spring的核心思想说说你的理解？"
    ],
    "tags": [
      "Spring",
      "Spring 框架定位",
      "核心思想",
      "Spring 框架定位与核心思想"
    ],
    "sourceRef": "Spring PDF p.1-3：说一下你对 Spring 的理解；Spring 的核心思想是什么",
    "source": "builtin",
    "order": 105
  },
  {
    "id": "java-spring-31c77853e9",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "如何理解Bean 单例、原型与作用域？",
    "coreAnswer": "Spring 中的 Bean 默认都是单例的。 就是说，每个Bean的实例只会被创建一次，并且会被存储在Spring容器的缓存中，以便在后续的请求中重复使 用。这种单例模式可以提高应用程序的性能和内存效率。 但是，Spring也支持将Bean设置为多例模式，即每次请求都会创建一个新的Bean实例。要将Bean设置为多例模 式，可以在Bean定义中通过设置scope属性为\"prototype\"来实现。 需要注意的是，虽然Spring的默认行为是将Bean设置为单例模式，但在一些情况下，使用多例模式是更为合适 的，例如在创建状态不可变的Bean或有状态Bean时。…",
    "explanation": "Bean是否单例？：Spring 中的 Bean 默认都是单例的。 就是说，每个Bean的实例只会被创建一次，并且会被存储在Spring容器的缓存中，以便在后续的请求中重复使 用。这种单例模式可以提高应用程序的性能和内存效率。 但是，Spring也支持将Bean设置为多例模式，即每次请求都会创建一个新的Bean实例。要将Bean设置为多例模 式，可以在Bean定义中通过设置scope属性为\"prototype\"来实现。 需要注意的是，虽然Spring的默认行为是将Bean设置为单例模式，但在一些情况下，使用多例模式是更为合适 的，例如在创建状态不可变的Bean或有状态Bean时。此外，需要注意的是，如果Bean单例是有状态的，那么在使 用时需要考虑线程安全性问题。 Bean的单例和非单例，生命周期是否一样：不一样的，Spring Bean 的生命周期完全由 IoC 容器控制。Spring 只帮我们管理单例模式 Bean 的完整生命周期， 对于 prototype 的 Bean，Spring 在创建好交给使用者之后，则不会再管理后续的生命周期。 具体区别如下： 阶段 单例（Singleton） 非单例（如Prototype） 创建 时机 初始 化流 程 销毁 时机 内存 占用 适用 场景 容器启动时创建（或首次请求时，取决于配 置）。 每次请求时创建新实例。 Spring bean的作用域有哪些？：Spring框架中的Bean作用域（Scope）定义了Bean的生命周期和可见性。不同的作用域影响着Spring容器如何管 理这些Bean的实例，包括它们如何被创建、如何被销毁以及它们是否可以被多个用户共享。 Spring支持几种不同的作用域，以满足不同的应用场景需求。以下是一些主要的Bean作用域： Singleton（单例）：在整个应用程序中只存在一个 Bean 实例。默认作用域，Spring 容器中只会创建一个 Bean 实例，并在容器的整个生命周期中共享该实例。 Prototype（原型）：每次请求时都会创建一个新的 Bean 实例。次从容器中获取该 Bean 时都会创建一个新 实例，适用于状态非常瞬时的 Bean。 Request（请求）：每个 HTTP 请求都会创建一个新的 Bean 实例。…",
    "keyPoints": [
      "能列出 singleton、prototype、request、session 等常用作用域，说明默认单例、线程安全不由容器保证，以及单例与原型 Bean 的创建销毁差异"
    ],
    "followUps": [
      "Bean的单例和非单例，生命周期是否一样？",
      "Spring bean的作用域有哪些？"
    ],
    "tags": [
      "Spring",
      "Bean 单例",
      "原型",
      "作用域",
      "Bean",
      "Bean 单例、原型与作用域"
    ],
    "sourceRef": "Spring PDF p.17：Bean 是否单例；单例和非单例生命周期是否一样；Bean 的作用域",
    "source": "builtin",
    "order": 106
  },
  {
    "id": "java-spring-d24485a6cb",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "如何理解循环依赖与三级缓存？",
    "coreAnswer": "循环依赖指的是两个类中的属性相互依赖对方：例如 A 类中有 B 属性，B 类中有 A属性，从而形成了一个依赖闭 环，如下图。 循环依赖问题在Spring中主要有三种情况： 第一种：通过构造方法进行依赖注入时产生的循环依赖问题。 第二种：通过setter方法进行依赖注入且是在多例（原型）模式下产生的循环依赖问题。 第三种：通过setter方法进行依赖注入且是在单例模式下产生的循环依赖问题。 只有【第三种方式】的循环依赖问题被 Spring 解决了，其他两种方式在遇到循环依赖问题时，Spring都会产生异 常。…",
    "explanation": "spring是如何解决循环依赖的？：循环依赖指的是两个类中的属性相互依赖对方：例如 A 类中有 B 属性，B 类中有 A属性，从而形成了一个依赖闭 环，如下图。 循环依赖问题在Spring中主要有三种情况： 第一种：通过构造方法进行依赖注入时产生的循环依赖问题。 第二种：通过setter方法进行依赖注入且是在多例（原型）模式下产生的循环依赖问题。 第三种：通过setter方法进行依赖注入且是在单例模式下产生的循环依赖问题。 只有【第三种方式】的循环依赖问题被 Spring 解决了，其他两种方式在遇到循环依赖问题时，Spring都会产生异 常。 Spring 在 DefaultSingletonBeanRegistry 类中维护了三个重要的缓存 (Map)，称为“三级缓存”： singletonObjects (一级缓存)：存放的是完全初始化好的、可用的 Bean 实例， getBean() 方法最终返回的 就是这里面的 Bean。… spring三级缓存的数据结构是什么？：都是 Map类型的缓存，比如Map {k:name; v:bean}。 1. 一级缓存（Singleton Objects）：这是一个Map类型的缓存，存储的是已经完全初始化好的bean，即完全 准备好可以使用的bean实例。键是bean的名称，值是bean的实例。这个缓存在 DefaultSingletonBeanRegistry 类中的 singletonObjects 属性中。 2. 二级缓存（Early Singleton Objects）：这同样是一个Map类型的缓存，存储的是早期的bean引用，即已经 实例化但还未完全初始化的bean。这些bean已经被实例化，但是可能还没有进行属性注入等操作。这个缓存 在 DefaultSingletonBeanRegistry 类中的 earlySingletonObjects 属性中。…",
    "keyPoints": [
      "单例 Setter 循环依赖的创建链路，说明三级缓存各存什么、早期代理为何需要对象工厂，并明确构造器循环依赖和原型 Bean 等边界",
      " Spring Boot 2.6+ 默认禁止循环引用，三级缓存只是框架的有限处理能力，不代表项目默认允许循环依赖"
    ],
    "followUps": [
      "spring三级缓存的数据结构是什么？"
    ],
    "tags": [
      "Spring",
      "循环依赖",
      "三级缓存",
      "循环依赖与三级缓存"
    ],
    "sourceRef": "Spring PDF p.10-13：Spring 如何解决循环依赖；为什么用三级缓存；三级缓存的数据结构是什么",
    "source": "builtin",
    "order": 107
  },
  {
    "id": "java-spring-c88f2dbffe",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 6,
    "question": "如何理解Spring 常用注解？",
    "coreAnswer": "@Autowired 注解 @Autowired：主要用于自动装配bean。当Spring容器中存在与要注入的属性类型匹配的bean时，它会自动将 bean注入到属性中。就跟我们new 对象一样。…",
    "explanation": "spring 常用注解有什么？：@Autowired 注解 @Autowired：主要用于自动装配bean。当Spring容器中存在与要注入的属性类型匹配的bean时，它会自动将 bean注入到属性中。就跟我们new 对象一样。 用法很简单，如下示例代码： @Component public class MyService { } @Component public class MyController { @Autowired private MyService myService; } 在上面的示例代码中，MyController类中的myService属性被@Autowired注解标记，Spring会自动将MyService类 型的bean注入到myService属性中。 @Component 这个注解用于标记一个类作为Spring的bean。…",
    "keyPoints": [
      "能按组件注册、依赖注入、配置、Web、事务五类列举常用注解，区分 @Component 家族、@Bean、@Autowired 和 @Resource 的主要语义"
    ],
    "followUps": [
      "能按组件注册、依赖注入、配置、Web、事务五类列举常用注解，区分 @Component 家族、@Bean、@Autowired 和 @Resource 的主要语义？"
    ],
    "tags": [
      "Spring",
      "Spring 常用注解"
    ],
    "sourceRef": "Spring PDF p.13-15：Spring 常用注解有什么",
    "source": "builtin",
    "order": 108
  },
  {
    "id": "java-spring-1a82bf77d9",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 6,
    "question": "MVC 分层与职责边界应该如何理解？",
    "coreAnswer": "MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典 范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定 制界面及用户交互的同时，不需要重新编写业务逻辑。 视图(view)： 为用户提供使用界面，与用户直接进行交互。 模型(model)： 代表一个存取数据的对象或 JAVA POJO（Plain Old Java Object，简单java对象）。它也可 以带有逻辑，主要用于承载数据，并对用户提交请求进行计算的模块。模型分为两类，一类称为数据承载 Bean，一类称为业务处理Bean。…",
    "explanation": "MVC分层介绍一下：MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典 范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定 制界面及用户交互的同时，不需要重新编写业务逻辑。 视图(view)： 为用户提供使用界面，与用户直接进行交互。 模型(model)： 代表一个存取数据的对象或 JAVA POJO（Plain Old Java Object，简单java对象）。它也可 以带有逻辑，主要用于承载数据，并对用户提交请求进行计算的模块。模型分为两类，一类称为数据承载 Bean，一类称为业务处理Bean。所谓数据承载 Bean 是指实体类（如：User类），专门为用户承载业务数 据的；而业务处理 Bean 则是指Service 或 Dao 对象， 专门用于处理用户提交请求的。…",
    "keyPoints": [
      " Model、View、Controller 的职责，映射到常见 Controller、Service、Repository 分层，并解释 DTO、领域对象和持久化对象不应随意混用"
    ],
    "followUps": [
      " Model、View、Controller 的职责，映射到常见 Controller、Service、Repository 分层，并解释 DTO、领域对象和持久化对象不应随意混用？"
    ],
    "tags": [
      "Spring",
      "MVC 分层",
      "职责边界",
      "MVC",
      "MVC 分层与职责边界"
    ],
    "sourceRef": "Spring PDF p.20-21：MVC 分层介绍一下",
    "source": "builtin",
    "order": 109
  },
  {
    "id": "java-spring-c8b9cd6f4b",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "Spring Boot 优势、约定与项目结构应该如何理解？",
    "coreAnswer": "简化开发：Spring Boot通过提供一系列的开箱即用的组件和自动配置，简化了项目的配置和开发过程，开发 人员可以更专注于业务逻辑的实现，而不需要花费过多时间在繁琐的配置上。 快速启动：Spring Boot提供了快速的应用程序启动方式，可通过内嵌的Tomcat、Jetty或Undertow等容器快 速启动应用程序，无需额外的部署步骤，方便快捷。 自动化配置：Spring Boot通过自动配置功能，根据项目中的依赖关系和约定俗成的规则来配置应用程序，减 少了配置的复杂性，使开发者更容易实现应用的最佳实践。…",
    "explanation": "为什么使用springboot：简化开发：Spring Boot通过提供一系列的开箱即用的组件和自动配置，简化了项目的配置和开发过程，开发 人员可以更专注于业务逻辑的实现，而不需要花费过多时间在繁琐的配置上。 快速启动：Spring Boot提供了快速的应用程序启动方式，可通过内嵌的Tomcat、Jetty或Undertow等容器快 速启动应用程序，无需额外的部署步骤，方便快捷。 自动化配置：Spring Boot通过自动配置功能，根据项目中的依赖关系和约定俗成的规则来配置应用程序，减 少了配置的复杂性，使开发者更容易实现应用的最佳实践。 怎么理解SpringBoot中的约定大于配置：约定大于配置是Spring Boot的核心设计理念，它通过预设合理的默认行为和项目规范，大幅减少开发者需要手动 配置的步骤，从而提升开发效率和项目标准化程度。 理解 Spring Boot 中的“约定大于配置”原则，可以从以下几个方面来解释： 自动化配置：Spring Boot 提供了大量的自动化配置，通过分析项目的依赖和环境，自动配置应用程序的行 为。开发者无需显式地配置每个细节，大部分常用的配置都已经预设好了。例如，引入 spring-boot-starter- web 后，Spring Boot会自动配置内嵌Tomcat和Spring MVC，无需手动编写XML。 默认配置：Spring Boot 为诸多方面提供大量默认配置，如连接数据库、设置 Web 服务器、处理日志等。开 发人员无需手动配置这些常见内容，框架已做好决策。… SpringBoot的项目结构是怎么样的？：一个正常的企业项目里一种通用的项目结构和代码层级划分的指导意见。按这《阿里巴巴Java开发手册》时本书上 说的，一般分为如下几层： 开放接口层：可直接封装 Service 接口暴露成 RPC 接口；通过 Web 封装成 http 接口；网关控制层等。 终端显示层：各个端的模板渲染并执行显示的层。当前主要是 velocity 渲染，JS 渲染，JSP 渲染，移动端展示 等。 Web 层：主要是对访问控制进行转发，各类基本参数校验，或者不复用的业务简单处理等。 Service 层：相对具体的业务逻辑服务层。 Manager 层：通用业务处理层，它有如下特征： 1）对第三方平台封装的层，预处理返回结果及转化异常信息，适配上层接口。 2）对 Service 层通用能力的下沉，如缓存方案、中间件通用处理。…",
    "keyPoints": [
      " Spring Boot 与传统 Spring 配置成本，解释约定优于配置，说明主启动类、配置文件与包扫描边界，并给出典型分层目录"
    ],
    "followUps": [
      "怎么理解SpringBoot中的约定大于配置？",
      "SpringBoot的项目结构是怎么样的？"
    ],
    "tags": [
      "Spring",
      "Spring Boot 优势",
      "约定",
      "项目结构",
      "Boot",
      "Spring Boot 优势、约定与项目结构"
    ],
    "sourceRef": "Spring PDF p.22-26：为什么使用 Spring Boot；约定大于配置；项目结构怎么样",
    "source": "builtin",
    "order": 110
  },
  {
    "id": "java-spring-192ad17f01",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 6,
    "question": "如何理解Spring Boot 重要注解？",
    "coreAnswer": "在 Spring Boot 中开启事务非常简单，只需在服务层的方法上添加 @Transactional 注解即可。 例如，假设我们有一个 UserService 接口，其中有一个保存用户的方法 saveUser()： public interface UserService { void saveUser(User user); } 我们希望在这个方法中开启事务，只需在该方法上添加 @Transactional 注解，如下所示： public class UserServiceImpl implements UserService { @Autowired private UserRepository userRepository;…",
    "explanation": "springboot怎么开启事务？：在 Spring Boot 中开启事务非常简单，只需在服务层的方法上添加 @Transactional 注解即可。 例如，假设我们有一个 UserService 接口，其中有一个保存用户的方法 saveUser()： public interface UserService { void saveUser(User user); } 我们希望在这个方法中开启事务，只需在该方法上添加 @Transactional 注解，如下所示： public class UserServiceImpl implements UserService { @Autowired private UserRepository userRepository; @Override @Transactional public void saveUser(User user) { userRepository.save(user); } } 这样，当调用 sa… SpringBoot里面有哪些重要的注解？还有一个配置相关的注解是哪个？：Spring Boot 中一些常用的注解包括： @SpringBootApplication：用于标注主应用程序类，标识一个Spring Boot应用程序的入口点，同时启用自 动配置和组件扫描。 @Controller：标识控制器类，处理HTTP请求。 @RestController：结合@Controller和@ResponseBody，返回RESTful风格的数据。 @Service：标识服务类，通常用于标记业务逻辑层。 @Repository：标识数据访问组件，通常用于标记数据访问层。 @Component：通用的Spring组件注解，表示一个受Spring管理的组件。 @Autowired：用于自动装配Spring Bean。 @Value：用于注入配置属性值。 @RequestMapping：用于映射HTTP请求路径到Controller的处理方法。…",
    "keyPoints": [
      "能拆解 @SpringBootApplication，并说明启动、配置类、组件扫描、配置属性绑定和条件装配相关关键注解的职责与使用边界"
    ],
    "followUps": [
      "SpringBoot里面有哪些重要的注解？还有一个配置相关的注解是哪个？"
    ],
    "tags": [
      "Spring",
      "Spring Boot 重要注解",
      "Boot"
    ],
    "sourceRef": "Spring PDF p.32-33：Spring Boot 有哪些重要注解；配置相关的注解是哪个",
    "source": "builtin",
    "order": 111
  },
  {
    "id": "java-spring-e13892a423",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "如何理解Filter 与 Interceptor？",
    "coreAnswer": "在 Spring Boot 中，过滤器（Filter）和拦截器（Interceptor）是用于处理请求和响应的两种不同机制。 特性 过滤器（Filter） 拦截器（Interceptor） 规范/框架 Servlet规范 Spring MVC框架 （ javax.servlet.Filter ） （ org.springframework.web.servlet.HandlerInterceptor ） 作用范围 全局（所有请求、静态资源） Controller层（仅拦截Spring管理的请求） 执行顺序 在Servlet之前执行 在DispatcherServlet之后、Controller方法前后执行 依赖注入 无法直接注入Sp…",
    "explanation": "SpringBoot 过滤器和拦截器说一下？：在 Spring Boot 中，过滤器（Filter）和拦截器（Interceptor）是用于处理请求和响应的两种不同机制。 特性 过滤器（Filter） 拦截器（Interceptor） 规范/框架 Servlet规范 Spring MVC框架 （ javax.servlet.Filter ） （ org.springframework.web.servlet.HandlerInterceptor ） 作用范围 全局（所有请求、静态资源） Controller层（仅拦截Spring管理的请求） 执行顺序 在Servlet之前执行 在DispatcherServlet之后、Controller方法前后执行 依赖注入 无法直接注入Spring Bean（需间接 支持 获取） 支持自动注入Spring Bean 触发时机 适用场景 doFilter() 在请求前/响应后被调 用 全局请求处理（编码、日志、安 全） preHandle…",
    "keyPoints": [
      "所属规范、拦截范围、执行位置、可访问上下文和异常处理比较二者，给出编码、鉴权、日志等合适场景并口述执行顺序"
    ],
    "followUps": [
      "所属规范、拦截范围、执行位置、可访问上下文和异常处理比较二者，给出编码、鉴权、日志等合适场景并口述执行顺序？"
    ],
    "tags": [
      "Spring",
      "Filter",
      "Interceptor",
      "Filter 与 Interceptor"
    ],
    "sourceRef": "Spring PDF p.34-35：Spring Boot 过滤器和拦截器说一下",
    "source": "builtin",
    "order": 112
  },
  {
    "id": "java-spring-db275b396b",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "JDBC 与 MyBatis 基础流程及取舍是什么？",
    "coreAnswer": "基于 SQL 语句编程，相当灵活，不会对应用程序或者数据库的现有设计造成任 何影响，SQL 写在 XML 里， 解除 sql 与程序代码的耦合，便于统一管理；提供 XML 标签，支持编写动态 SQL 语句，并可重用。 与 JDBC 相比，减少了 50%以上的代码量，消除了 JDBC 大量冗余的代码，不 需要手动开关连接； 很好的与各种数据库兼容，因为 MyBatis 使用 JDBC 来连接数据库，所以只要 JDBC 支持的数据库 MyBatis 都支持。 能够与 Spring 很好的集成，开发效率高 提供映射标签，支持对象与数据库的 ORM 字段关系映射；提供对象关系映射 标签，支持对象关系组件维 护。…",
    "explanation": "与传统的JDBC相比，MyBatis的优点？：基于 SQL 语句编程，相当灵活，不会对应用程序或者数据库的现有设计造成任 何影响，SQL 写在 XML 里， 解除 sql 与程序代码的耦合，便于统一管理；提供 XML 标签，支持编写动态 SQL 语句，并可重用。 与 JDBC 相比，减少了 50%以上的代码量，消除了 JDBC 大量冗余的代码，不 需要手动开关连接； 很好的与各种数据库兼容，因为 MyBatis 使用 JDBC 来连接数据库，所以只要 JDBC 支持的数据库 MyBatis 都支持。 能够与 Spring 很好的集成，开发效率高 提供映射标签，支持对象与数据库的 ORM 字段关系映射；提供对象关系映射 标签，支持对象关系组件维 护。 还记得JDBC连接数据库的步骤吗？：使用Java JDBC连接数据库的一般步骤如下： 1. 加载数据库驱动程序：在使用JDBC连接数据库之前，需要加载相应的数据库驱动程序。可以通过 Class.forName(\"com.mysql.jdbc.Driver\") 来加载MySQL数据库的驱动程序。不同数据库的驱动类名会有所 不同。 2. 建立数据库连接：使用 DriverManager 类的 getConnection(url, username, password) 方法来连接数据库， 其中url是数据库的连接字符串（包括数据库类型、主机、端口等）、username是数据库用户名，password 是密码。 3. 创建 Statement 对象：通过 Connection 对象的 createStatement() 方法创建一个 Statement 对象，用于执 行 SQL 查询或更新操作。…",
    "keyPoints": [
      " JDBC 连接、预编译、执行、结果处理与资源释放步骤，说明 MyBatis 在映射、参数处理、SQL 管理上的优势及仍需承担的 SQL 成本"
    ],
    "followUps": [
      "还记得JDBC连接数据库的步骤吗？"
    ],
    "tags": [
      "Spring",
      "JDBC",
      "MyBatis 基础流程",
      "取舍",
      "MyBatis",
      "JDBC 与 MyBatis 基础流程及取舍"
    ],
    "sourceRef": "Spring PDF p.35-37：与 JDBC 相比 MyBatis 的优点；JDBC 连接数据库的步骤",
    "source": "builtin",
    "order": 113
  },
  {
    "id": "java-spring-35107b42f0",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "MyBatis 中 #{} 与 ${} 的区别是什么？",
    "coreAnswer": "Mybatis 在处理 #{} 时，会创建预编译的 SQL 语句，将 SQL 中的 #{} 替换为 ? 号，在执行 SQL 时会为预编译 SQL 中的占位符（?）赋值，调用 PreparedStatement 的 set 方法来赋值，预编译的 SQL 语句执行效率高， 并且可以防止SQL 注入，提供更高的安全性，适合传递参数值。 Mybatis 在处理 ${} 时，只是创建普通的 SQL 语句，然后在执行 SQL 语句时 MyBatis 将参数直接拼入到 SQL 里，不能防止 SQL 注入，因为参数直接拼接到 SQL 语句中，如果参数未经过验证、过滤，可能会导致安全问 题。",
    "explanation": "Mybatis里的 # 和 $ 的区别？：Mybatis 在处理 #{} 时，会创建预编译的 SQL 语句，将 SQL 中的 #{} 替换为 ? 号，在执行 SQL 时会为预编译 SQL 中的占位符（?）赋值，调用 PreparedStatement 的 set 方法来赋值，预编译的 SQL 语句执行效率高， 并且可以防止SQL 注入，提供更高的安全性，适合传递参数值。 Mybatis 在处理 ${} 时，只是创建普通的 SQL 语句，然后在执行 SQL 语句时 MyBatis 将参数直接拼入到 SQL 里，不能防止 SQL 注入，因为参数直接拼接到 SQL 语句中，如果参数未经过验证、过滤，可能会导致安全问 题。",
    "keyPoints": [
      "预编译参数绑定与字符串拼接的差异，说明 SQL 注入风险、各自适用场景，以及表名、列名等动态标识符必须如何校验"
    ],
    "followUps": [
      "预编译参数绑定与字符串拼接的差异，说明 SQL 注入风险、各自适用场景，以及表名、列名等动态标识符必须如何校验？"
    ],
    "tags": [
      "Spring",
      "MyBatis 中 #{}",
      "${} 的区别",
      "MyBatis",
      "MyBatis 中 #{} 与 ${} 的区别"
    ],
    "sourceRef": "Spring PDF p.38-39：MyBatis 里的 # 和 $ 的区别",
    "source": "builtin",
    "order": 114
  },
  {
    "id": "java-spring-a7970870b0",
    "deckId": "java-basics-sample",
    "topic": "Spring",
    "importance": "A",
    "score": 7,
    "question": "如何理解Spring Cloud 定位与常用组件？",
    "coreAnswer": "Spring Boot是用于构建单个Spring应用的框架，而Spring Cloud则是用于构建分布式系统中的微服务架构的工 具，Spring Cloud提供了服务注册与发现、负载均衡、断路器、网关等功能。 两者可以结合使用，通过Spring Boot构建微服务应用，然后用Spring Cloud来实现微服务架构中的各种功能。 微服务常用的组件： 注册中心：注册中心是微服务架构最核心的组件。它起到的作用是对新节点的注册与状态维护，解决了「如 何发现新节点以及检查各节点的运行状态的问题」。微服务节点在启动时会将自己的服务名称、IP、端口等信 息在注册中心登记，注册中心会定时检查该节点的运行状态。…",
    "explanation": "了解SpringCloud吗，说一下他和SpringBoot的区别：Spring Boot是用于构建单个Spring应用的框架，而Spring Cloud则是用于构建分布式系统中的微服务架构的工 具，Spring Cloud提供了服务注册与发现、负载均衡、断路器、网关等功能。 两者可以结合使用，通过Spring Boot构建微服务应用，然后用Spring Cloud来实现微服务架构中的各种功能。 用过哪些微服务组件？：微服务常用的组件： 注册中心：注册中心是微服务架构最核心的组件。它起到的作用是对新节点的注册与状态维护，解决了「如 何发现新节点以及检查各节点的运行状态的问题」。微服务节点在启动时会将自己的服务名称、IP、端口等信 息在注册中心登记，注册中心会定时检查该节点的运行状态。注册中心通常会采用心跳机制最大程度保证已 登记过的服务节点都是可用的。 负载均衡：负载均衡解决了「如何发现服务及负载均衡如何实现的问题」，通常微服务在互相调用时，并不 是直接通过IP、端口进行访问调用。而是先通过服务名在注册中心查询该服务拥有哪些节点，注册中心将该服 务可用节点列表返回给服务调用者，这个过程叫服务发现，因服务高可用的要求，服务调用者会接收到多个 节点，必须要从中进行选择。因此服务调用者一端必须内置负载均衡器，通过负载均衡策略选择合适的节点 发起实质性的通信请求。…",
    "keyPoints": [
      " Spring Boot 的应用开发能力与 Spring Cloud 的分布式治理能力，按注册配置、调用、网关、限流熔断、链路追踪列举常用组件"
    ],
    "followUps": [
      "用过哪些微服务组件？"
    ],
    "tags": [
      "Spring",
      "Spring Cloud 定位",
      "常用组件",
      "Cloud",
      "Spring Cloud 定位与常用组件"
    ],
    "sourceRef": "Spring PDF p.39-41：Spring Cloud 和 Spring Boot 的区别；用过哪些微服务组件",
    "source": "builtin",
    "order": 115
  },
  {
    "id": "java-mysql-a5f200835a",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解InnoDB、MyISAM 与默认引擎选择？",
    "coreAnswer": "InnoDB引擎在事务支持、并发性能、崩溃恢复等方面具有优势，因此被MySQL选择为默认的存储引擎。 事务支持：InnoDB引擎提供了对事务的支持，可以进行ACID（原子性、一致性、隔离性、持久性）属性的操 作。Myisam存储引擎是不支持事务的。 并发性能：InnoDB引擎采用了行级锁定的机制，可以提供更好的并发性能，Myisam存储引擎只支持表锁， 锁的粒度比较大。 崩溃恢复：InnoDB引引擎通过 redolog 日志实现了崩溃恢复，可以在数据库发生异常情况（如断电）时，通 过日志文件进行恢复，保证数据的持久性和一致性。Myisam是不支持崩溃恢复的。…",
    "explanation": "MySQL为什么InnoDB是默认引擎？：InnoDB引擎在事务支持、并发性能、崩溃恢复等方面具有优势，因此被MySQL选择为默认的存储引擎。 事务支持：InnoDB引擎提供了对事务的支持，可以进行ACID（原子性、一致性、隔离性、持久性）属性的操 作。Myisam存储引擎是不支持事务的。 并发性能：InnoDB引擎采用了行级锁定的机制，可以提供更好的并发性能，Myisam存储引擎只支持表锁， 锁的粒度比较大。 崩溃恢复：InnoDB引引擎通过 redolog 日志实现了崩溃恢复，可以在数据库发生异常情况（如断电）时，通 过日志文件进行恢复，保证数据的持久性和一致性。Myisam是不支持崩溃恢复的。 说一下mysql的innodb与MyISAM的区别？：事务：InnoDB 支持事务，MyISAM 不支持事务，这是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重 要原因之一。 索引结构：InnoDB 是聚簇索引，MyISAM 是非聚簇索引。聚簇索引的文件存放在主键索引的叶子节点上，因 此 InnoDB 必须要有主键，通过主键索引效率很高。但是辅助索引需要两次查询，先查询到主键，然后再通 过主键查询到数据。因此，主键不应该过大，因为主键太大，其他索引也都会很大。而 MyISAM 是非聚簇索 引，数据文件是分离的，索引保存的是数据文件的指针。主键索引和辅助索引是独立的。 锁粒度：InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。一个更新语句会锁住整张表，导致其 他查询和更新都会被阻塞，因此并发访问受限。 count 的效率：InnoDB 不保存表的具体行数，执行 select count(*) from table 时需要全表扫描。…",
    "keyPoints": [
      "事务、锁粒度、崩溃恢复、索引组织和适用场景比较 InnoDB 与 MyISAM，并说明 InnoDB 成为默认引擎的关键原因"
    ],
    "followUps": [
      "说一下mysql的innodb与MyISAM的区别？"
    ],
    "tags": [
      "MySQL",
      "InnoDB",
      "MyISAM 与默认引擎选择",
      "MyISAM",
      "InnoDB、MyISAM 与默认引擎选择"
    ],
    "sourceRef": "MySQL PDF p.17-18：MySQL 有哪些引擎；为什么 InnoDB 是默认引擎；InnoDB 与 MyISAM 的区别",
    "source": "builtin",
    "order": 116
  },
  {
    "id": "java-mysql-0156f537cb",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解索引作用、分类与代价？",
    "coreAnswer": "索引类似于书籍的目录，可以减少扫描的数据量，提高查询效率。 MySQL可以按照四个角度来分类索引。 按「数据结构」分类：B+tree索引、Hash索引、Full-text索引。 按「物理存储」分类：聚簇索引（主键索引）、二级索引（辅助索引）。 按「字段特性」分类：主键索引、唯一索引、普通索引、前缀索引。 按「字段个数」分类：单列索引、联合索引。 接下来，按照这些角度来说说各类索引的特点。 按数据结构分类 从数据结构的角度来看，MySQL 常见索引有 B+Tree 索引、HASH 索引、Full-Text 索引。…",
    "explanation": "索引是什么？有什么好处？：索引类似于书籍的目录，可以减少扫描的数据量，提高查询效率。 讲讲索引的分类是什么？：MySQL可以按照四个角度来分类索引。 按「数据结构」分类：B+tree索引、Hash索引、Full-text索引。 按「物理存储」分类：聚簇索引（主键索引）、二级索引（辅助索引）。 按「字段特性」分类：主键索引、唯一索引、普通索引、前缀索引。 按「字段个数」分类：单列索引、联合索引。 接下来，按照这些角度来说说各类索引的特点。 按数据结构分类 从数据结构的角度来看，MySQL 常见索引有 B+Tree 索引、HASH 索引、Full-Text 索引。 每一种存储引擎支持的索引类型不一定相同，我在表中总结了 MySQL 常见的存储引擎 InnoDB、MyISAM 和 Memory 分别支持的索引类型。 InnoDB 是在 MySQL 5.5 之后成为默认的 MySQL 存储引擎，B+Tree 索引类型也是 MySQL 存储引擎采用最多的索 引类型。… 索引的优缺点？：索引最大的好处是提高查询速度，但是索引也是有缺点的，比如： 需要占用物理空间，数量越大，占用空间越大； 创建索引和维护索引要耗费时间，这种时间随着数据量的增加而增大； 会降低表的增删改的效率，因为每次增删改索引，B+ 树为了维护索引有序性，都需要进行动态维护。 所以，索引不是万能钥匙，它也是根据场景来使用的。",
    "keyPoints": [
      "索引加速查询的原理，按数据结构、物理组织和字段组合分类，并指出空间、写放大和维护成本"
    ],
    "followUps": [
      "讲讲索引的分类是什么？",
      "索引的优缺点？"
    ],
    "tags": [
      "MySQL",
      "索引作用",
      "分类",
      "代价",
      "索引作用、分类与代价"
    ],
    "sourceRef": "MySQL PDF p.19-22、p.34：索引是什么；索引如何分类；索引的优缺点",
    "source": "builtin",
    "order": 117
  },
  {
    "id": "java-mysql-c8ddcb8c41",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解聚簇索引、二级索引与回表？",
    "coreAnswer": "数据存储：在聚簇索引中，数据行按照索引键值的顺序存储，也就是说，索引的叶子节点包含了实际的数据 行。这意味着索引结构本身就是数据的物理存储结构。非聚簇索引的叶子节点不包含完整的数据行，而是包 含指向数据行的指针或主键值。数据行本身存储在聚簇索引中。 索引与数据关系：由于数据与索引紧密相连，当通过聚簇索引查找数据时，可以直接从索引中获得数据行， 而不需要额外的步骤去查找数据所在的位置。当通过非聚簇索引查找数据时，首先在非聚簇索引中找到对应 的主键值，然后通过这个主键值回溯到聚簇索引中查找实际的数据行，这个过程称为“回表”。 唯一性：聚簇索引通常是基于主键构建的，因此每个表只能有一个聚簇索引，因为数据只能有一种物理排序 方式。…",
    "explanation": "MySQL聚簇索引和非聚簇索引的区别是什么？：数据存储：在聚簇索引中，数据行按照索引键值的顺序存储，也就是说，索引的叶子节点包含了实际的数据 行。这意味着索引结构本身就是数据的物理存储结构。非聚簇索引的叶子节点不包含完整的数据行，而是包 含指向数据行的指针或主键值。数据行本身存储在聚簇索引中。 索引与数据关系：由于数据与索引紧密相连，当通过聚簇索引查找数据时，可以直接从索引中获得数据行， 而不需要额外的步骤去查找数据所在的位置。当通过非聚簇索引查找数据时，首先在非聚簇索引中找到对应 的主键值，然后通过这个主键值回溯到聚簇索引中查找实际的数据行，这个过程称为“回表”。 唯一性：聚簇索引通常是基于主键构建的，因此每个表只能有一个聚簇索引，因为数据只能有一种物理排序 方式。一个表可以有多个非聚簇索引，因为它们不直接影响数据的物理存储位置。 效率：对于范围查询和排序查询，聚簇索引通常更有效率，因为它避免了额外的寻址开销。… MySQL主键是聚簇索引吗？：在MySQL的InnoDB存储引擎中，主键确实是以聚簇索引的形式存储的。 InnoDB将数据存储在B+树的结构中，其中主键索引的B+树就是所谓的聚簇索引。这意味着表中的数据行在物理上 是按照主键的顺序排列的，聚簇索引的叶节点包含了实际的数据行。 InnoDB 在创建聚簇索引时，会根据不同的场景选择不同的列作为索引： 如果有主键，默认会使用主键作为聚簇索引的索引键； 如果没有主键，就选择第一个不包含 NULL 值的唯一列作为聚簇索引的索引键； 在上面两个都没有的情况下，InnoDB 将自动生成一个隐式自增 id 列作为聚簇索引的索引键； 一张表只能有一个聚簇索引，那为了实现非主键字段的快速搜索，就引出了二级索引（非聚簇索引/辅助索引）， 它也是利用了 B+ 树的数据结构，但是二级索引的叶子节点存放的是主键值，不是实际数据。 查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？：数据页中的记录按照「主键」顺序组成单向链表，单向链表的特点就是插入、删除非常方便，但是检索效率不高， 最差的情况下需要遍历链表上的所有节点才能完成检索。 因此，数据页中有一个页目录，起到记录的索引作用，就像我们书那样，针对书中内容的每个章节设立了一个目 录，想看某个章节的时候，可以查看目录，快速找到对应的章节的页数，而数据页中的页目录就是为了能快速找到",
    "keyPoints": [
      "聚簇索引叶子节点保存什么、二级索引保存什么，画出主键查询和二级索引回表路径，并解释主键是否必然等同于显式主键索引"
    ],
    "followUps": [
      "MySQL主键是聚簇索引吗？",
      "查询数据时，到了B+树的叶子节点，之后的查找数据是如何做？"
    ],
    "tags": [
      "MySQL",
      "聚簇索引",
      "二级索引",
      "回表",
      "聚簇索引、二级索引与回表"
    ],
    "sourceRef": "MySQL PDF p.23-26：聚簇与非聚簇索引区别；MySQL 主键是聚簇索引吗；到 B+ 树叶子节点后如何找数据",
    "source": "builtin",
    "order": 118
  },
  {
    "id": "java-mysql-7c5e7796dd",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "RR 可见性与幻读边界应该如何理解？",
    "coreAnswer": "可重复读隔离级是由 MVCC（多版本并发控制）实现的，实现的方式是开始事务后（执行 begin 语句后），在执行 第一个查询语句后，会创建一个 Read View，后续的查询语句利用这个 Read View，通过这个 Read View 就可以 在 undo log 版本链找到事务开始时的数据，所以事务过程中每次查询的数据都是一样的，即使中途有其他事务插 入了新纪录，是查询不出来这条数据的。 可重复读隔离级别下虽然很大程度上避免了幻读，但是还是没有能完全解决幻读。 我举例一个可重复读隔离级别发生幻读现象的场景。以这张表作为例子： 事务 A 执行查询 id = 5 的记录，此时表中是没有该记录的，所以查询不出来。",
    "explanation": "可重复读隔离级别下，A事务提交的数据，在B事务能看见吗？：可重复读隔离级是由 MVCC（多版本并发控制）实现的，实现的方式是开始事务后（执行 begin 语句后），在执行 第一个查询语句后，会创建一个 Read View，后续的查询语句利用这个 Read View，通过这个 Read View 就可以 在 undo log 版本链找到事务开始时的数据，所以事务过程中每次查询的数据都是一样的，即使中途有其他事务插 入了新纪录，是查询不出来这条数据的。 举个例子说可重复读下的幻读问题：可重复读隔离级别下虽然很大程度上避免了幻读，但是还是没有能完全解决幻读。 我举例一个可重复读隔离级别发生幻读现象的场景。以这张表作为例子： 事务 A 执行查询 id = 5 的记录，此时表中是没有该记录的，所以查询不出来。 Mysql 设置了可重读隔离级后，怎么保证不发生幻读？：尽量在开启事务之后，马上执行 select ... for update 这类锁定读的语句，因为它会对记录加 next-key lock，从 而避免其他事务插入一条新记录，就避免了幻读的问题。",
    "keyPoints": [
      "能分别判断 RR 下同一事务的快照读与当前读可见性，说明快照读通常避免幻读、当前读依赖 next-key lock，并明确 RR 不等于任何场景都绝对无幻读"
    ],
    "followUps": [
      "举个例子说可重复读下的幻读问题？",
      "Mysql 设置了可重读隔离级后，怎么保证不发生幻读？"
    ],
    "tags": [
      "MySQL",
      "RR 可见性",
      "幻读边界",
      "RR",
      "RR 可见性与幻读边界"
    ],
    "sourceRef": "MySQL PDF p.41-42：RR 下能否看到另一事务提交；可重复读下的幻读；如何保证不发生幻读",
    "source": "builtin",
    "order": 119
  },
  {
    "id": "java-mysql-5b830c9afb",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解多表连接、子查询与 IN、EXISTS？",
    "coreAnswer": "数据库有以下几种联表查询类型： 1. 内连接 (INNER JOIN) 2. 左外连接 (LEFT JOIN) 3. 右外连接 (RIGHT JOIN) 4. 全外连接 (FULL JOIN) 1. 内连接 (INNER JOIN) 内连接返回两个表中有匹配关系的行。示例: SELECT employees.name, departments.name FROM employees INNER JOIN departments ON employees.department_id = departments.id; 这个查询返回每个员工及其所在的部门名称。…",
    "explanation": "MySQL 怎么连表查询？：数据库有以下几种联表查询类型： 1. 内连接 (INNER JOIN) 2. 左外连接 (LEFT JOIN) 3. 右外连接 (RIGHT JOIN) 4. 全外连接 (FULL JOIN) 1. 内连接 (INNER JOIN) 内连接返回两个表中有匹配关系的行。示例: SELECT employees.name, departments.name FROM employees INNER JOIN departments ON employees.department_id = departments.id; 这个查询返回每个员工及其所在的部门名称。 2. 左外连接 (LEFT JOIN) 左外连接返回左表中的所有行，即使在右表中没有匹配的行。未匹配的右表列会包含NULL。… 在MySQL中， IN 和 EXISTS 都是用来处理子查询的关键词，但它们在功能、性能和使用场景上有各自的特点和：区别。 IN关键字 IN 用于检查左边的表达式是否存在于右边的列表或子查询的结果集中。如果存在，则 IN 返回 TRUE ，否则返回 FALSE 。 语法结构： SELECT column_name(s) FROM table_name WHERE column_name IN (value1, value2, ...); 或 SELECT column_name(s) FROM table_name WHERE column_name IN (SELECT column_name FROM another_table WHERE condition); 例子： SELECT * FROM Customers WHERE Country IN ('Germany', 'France'); EXISTS关键字 EXISTS 用于判断子查询是否至少能返回一行数据。它不关心子查询返回什么数据，只关心是否有结果。…",
    "keyPoints": [
      "内连接、外连接和自连接的基本形式，说明 IN、EXISTS 的语义差别及 NULL 风险，并以执行计划判断具体性能而非背固定结论"
    ],
    "followUps": [
      "在MySQL中， IN 和 EXISTS 都是用来处理子查询的关键词，但它们在功能、性能和使用场景上有各自的特点和？"
    ],
    "tags": [
      "MySQL",
      "多表连接",
      "子查询与 IN",
      "EXISTS",
      "IN",
      "多表连接、子查询与 IN、EXISTS"
    ],
    "sourceRef": "MySQL PDF p.6、p.10-11：怎么连表查询；IN 和 EXISTS 的区别",
    "source": "builtin",
    "order": 120
  },
  {
    "id": "java-mysql-a2b6bb892b",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解唯一性、主键与外键约束？",
    "coreAnswer": "方式一：使用UNIQUE约束 在表的相关列上添加UNIQUE约束，确保每个值在该列中唯一。例如： CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) UNIQUE, name VARCHAR(255) ); 如果尝试插入重复的email，MySQL会返回错误。 方式二：使用INSERT ... ON DUPLICATE KEY UPDATE 这种语句允许在插入记录时处理重复键的情况。…",
    "explanation": "MySQL如何避免重复插入数据？：方式一：使用UNIQUE约束 在表的相关列上添加UNIQUE约束，确保每个值在该列中唯一。例如： CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) UNIQUE, name VARCHAR(255) ); 如果尝试插入重复的email，MySQL会返回错误。 方式二：使用INSERT ... ON DUPLICATE KEY UPDATE 这种语句允许在插入记录时处理重复键的情况。… 说一下外键约束：外键约束的作用是维护表与表之间的关系，确保数据的完整性和一致性。让我们举一个简单的例子： 假设你有两个表，一个是学生表，另一个是课程表，这两个表之间有一个关系，即一个学生可以选修多门课程，而 一门课程也可以被多个学生选修。在这种情况下，我们可以在学生表中定义一个指向课程表的外键，如下所示： CREATE TABLE students ( id INT PRIMARY KEY, name VARCHAR(50), course_id INT, FOREIGN KEY (course_id) REFERENCES courses(id) ); 这里， students 表中的 course_id 字段是一个外键，它指向 courses 表中的 id 字段。这个外键约束确保了每个 学生所选的课程在 courses 表中都存在，从而维护了数据的完整性和一致性。…",
    "keyPoints": [
      "能用主键、唯一索引和插入策略避免重复数据，解释外键的完整性收益及更新删除行为，并说明高并发系统是否采用数据库外键的取舍"
    ],
    "followUps": [
      "说一下外键约束？"
    ],
    "tags": [
      "MySQL",
      "唯一性",
      "主键",
      "外键约束",
      "唯一性、主键与外键约束"
    ],
    "sourceRef": "MySQL PDF p.7、p.10：如何避免重复插入；说一下外键约束",
    "source": "builtin",
    "order": 121
  },
  {
    "id": "java-mysql-73c2fc48d4",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "复杂 SQL 题的拆解方法应该如何理解？",
    "coreAnswer": "有三张表：学生信息表、学生选课表、学生班级表 学生信息表（students）结构如下： CREATE TABLE students ( student_id INT PRIMARY KEY, //学生的唯一标识，主键。 student_name VARCHAR(50), //学生姓名。 class_id INT //学生所属班级的标识，用于关联班级表。 ); 学生选课表（ course_selections ）结构如下： CREATE TABLE course_selections ( selection_id INT PRIMARY KEY, //选课记录的唯一标识，主键。…",
    "explanation": "SQL题：查某个班级下所有学生的选课情况：有三张表：学生信息表、学生选课表、学生班级表 学生信息表（students）结构如下： CREATE TABLE students ( student_id INT PRIMARY KEY, //学生的唯一标识，主键。 student_name VARCHAR(50), //学生姓名。 class_id INT //学生所属班级的标识，用于关联班级表。 ); 学生选课表（ course_selections ）结构如下： CREATE TABLE course_selections ( selection_id INT PRIMARY KEY, //选课记录的唯一标识，主键。 student_id INT, //选课学生的标识，用于关联学生信息表。 course_name VARCHAR(50), //所选课程的名称。…",
    "keyPoints": [
      "能把集合差、总分排名和全量选课题拆成数据集、连接、过滤、分组、窗口或子查询步骤，并能用小样本验证重复行与 NULL 边界"
    ],
    "followUps": [
      "能把集合差、总分排名和全量选课题拆成数据集、连接、过滤、分组、窗口或子查询步骤，并能用小样本验证重复行与 NULL 边界？"
    ],
    "tags": [
      "MySQL",
      "复杂 SQL 题的拆解方法",
      "SQL"
    ],
    "sourceRef": "MySQL PDF p.14-15：课程差集、总分排名、班级选课情况 SQL 题",
    "source": "builtin",
    "order": 122
  },
  {
    "id": "java-mysql-61fc0e91dd",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解主键选型：自增 ID、UUID 与业务键？",
    "coreAnswer": "字段具有唯一性，且不能为空的特性 字段最好的是有递增的趋势的，如果字段的值是随机无序的，可能会引发页分裂的问题，造型性能影响。 不建议用业务数据作为主键，比如会员卡号、订单号、学生号之类的，因为我们无法预测未来会不会因为业 务需要，而出现业务字段重复或者重用的情况。 通常情况下会用自增字段来做主键，对于单机系统来说是没问题的。但是，如果有多台服务器，各自都可以 录入数据，那就不一定适用了。因为如果每台机器各自产生的数据需要合并，就可能会出现主键重复的问 题，这时候就需要考虑分布式 id 的方案了。 用的是自增 id。…",
    "explanation": "什么字段适合当做主键？：字段具有唯一性，且不能为空的特性 字段最好的是有递增的趋势的，如果字段的值是随机无序的，可能会引发页分裂的问题，造型性能影响。 不建议用业务数据作为主键，比如会员卡号、订单号、学生号之类的，因为我们无法预测未来会不会因为业 务需要，而出现业务字段重复或者重用的情况。 通常情况下会用自增字段来做主键，对于单机系统来说是没问题的。但是，如果有多台服务器，各自都可以 录入数据，那就不一定适用了。因为如果每台机器各自产生的数据需要合并，就可能会出现主键重复的问 题，这时候就需要考虑分布式 id 的方案了。 表中十个字段，你主键用自增ID还是UUID，为什么？：用的是自增 id。 因为 uuid 相对顺序的自增 id 来说是毫无规律可言的，新行的值不一定要比之前的主键的值要大，所以 innodb 无 法做到总是把新行插入到索引的最后，而是需要为新行寻找新的合适的位置从而来分配新的空间。 这个过程需要做很多额外的操作，数据的毫无顺序会导致数据分布散乱，将会导致以下的问题： 写入的目标页很可能已经刷新到磁盘上并且从缓存上移除，或者还没有被加载到缓存中，innodb 在插入之前 不得不先找到并从磁盘读取目标页到内存中，这将导致大量的随机 IO。 因为写入是乱序的，innodb 不得不频繁的做页分裂操作，以便为新的行分配空间，页分裂导致移动大量的数 据，影响性能。 由于频繁的页分裂，页会变得稀疏并被不规则的填充，最终会导致数据会有碎片。 结论：使用 InnoDB 应该尽可能的按主键的自增顺序插入，并且尽可能使用单调的增加的聚簇键的值来插入新行。…",
    "keyPoints": [
      "唯一性、键宽、页分裂、写入局部性、分布式生成与暴露风险比较自增 ID、UUID 和业务键，不把“有序”简化为唯一判断标准"
    ],
    "followUps": [
      "表中十个字段，你主键用自增ID还是UUID，为什么？",
      "什么自增ID更快一些，UUID不快吗，它在B+树里面存储是有序的吗?"
    ],
    "tags": [
      "MySQL",
      "主键选型",
      "自增 ID",
      "UUID 与业务键",
      "ID",
      "UUID"
    ],
    "sourceRef": "MySQL PDF p.24-25：什么字段适合当主键；自增 ID 还是 UUID；为什么自增 ID 更快",
    "source": "builtin",
    "order": 123
  },
  {
    "id": "java-mysql-2d25ef7eeb",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "索引选择性与索引设计应该如何理解？",
    "coreAnswer": "不建议针对性别字段加索引。 实际上与索引创建规则之一区分度有关，性别字段假设有100w数据，50w男、50w女，区别度几乎等于 0 。 区分度的计算方式 ：select count(DISTINCT sex)/count(*) from sys_user 实际上对于性别字段不适合创建索引，是因为select * 操作，还得进行50w次回表操作，根据主键从聚簇索引中找 到其他字段 ，这一部分开销从上面的测试来说还是比较大的，所以从性能角度来看不建议性别字段加索引，加上索 引并不是索引失效，而是回表操作使得变慢的。…",
    "explanation": "性别字段能加索引么？为啥？：不建议针对性别字段加索引。 实际上与索引创建规则之一区分度有关，性别字段假设有100w数据，50w男、50w女，区别度几乎等于 0 。 区分度的计算方式 ：select count(DISTINCT sex)/count(*) from sys_user 实际上对于性别字段不适合创建索引，是因为select * 操作，还得进行50w次回表操作，根据主键从聚簇索引中找 到其他字段 ，这一部分开销从上面的测试来说还是比较大的，所以从性能角度来看不建议性别字段加索引，加上索 引并不是索引失效，而是回表操作使得变慢的。 既然走索引的查询的成本比全表扫描高，优化器就会选择全表扫描的方向进行查询，这时候建立的性别字段索引就 没有启到加快查询的作用，反而还因为创建了索引占用了空间。 索引字段是不是建的越多越好？：不是，建的的越多会占用越多的空间，而且在写入频繁的场景下，对于B+树的维护所付出的性能消耗也会越大 索引的优缺点？：索引最大的好处是提高查询速度，但是索引也是有缺点的，比如： 需要占用物理空间，数量越大，占用空间越大； 创建索引和维护索引要耗费时间，这种时间随着数据量的增加而增大； 会降低表的增删改的效率，因为每次增删改索引，B+ 树为了维护索引有序性，都需要进行动态维护。 所以，索引不是万能钥匙，它也是根据场景来使用的。",
    "keyPoints": [
      "能结合过滤性、查询组合、排序分组、回表成本和写入频率决定索引，解释性别、状态等低基数字段何时可能有用，并避免索引越多越好"
    ],
    "followUps": [
      "索引字段是不是建的越多越好？",
      "索引的优缺点？"
    ],
    "tags": [
      "MySQL",
      "索引选择性",
      "索引设计",
      "索引选择性与索引设计"
    ],
    "sourceRef": "MySQL PDF p.24-25、p.34-35：性别或状态字段是否适合建索引；索引越多越好吗；怎么决定建哪些索引",
    "source": "builtin",
    "order": 124
  },
  {
    "id": "java-mysql-8b70dd3cc2",
    "deckId": "java-basics-sample",
    "topic": "MySQL",
    "importance": "A",
    "score": 7,
    "question": "如何理解UPDATE 原子性与大事务风险？",
    "coreAnswer": "是原子性，主要通过锁+undolog 日志保证原子性的 执行 update 的时候，会加行级别锁，保证了一个事务更新一条记录的时候，不会被其他事务干扰。 事务执行过程中，会生成 undolog，如果事务执行失败，就可以通过 undolog 日志进行回滚。 事务的资源在事务提交之后才会释放的，比如存储资源、锁。 如果一个事务特别多 sql，那么会带来这些问题： 如果一个事务特别多 sql，锁定的数据太多，容易造成大量的死锁和锁超时。 回滚记录会占用大量存储空间，事务回滚时间长。在MySQL (opens new window)中，实际上每条记录在更 新的时候都会同时记录一条回滚操作。…",
    "explanation": "一条update是不是原子性的？为什么？：是原子性，主要通过锁+undolog 日志保证原子性的 执行 update 的时候，会加行级别锁，保证了一个事务更新一条记录的时候，不会被其他事务干扰。 事务执行过程中，会生成 undolog，如果事务执行失败，就可以通过 undolog 日志进行回滚。 滥用事务，或者一个事务里有特别多sql的弊端？：事务的资源在事务提交之后才会释放的，比如存储资源、锁。 如果一个事务特别多 sql，那么会带来这些问题： 如果一个事务特别多 sql，锁定的数据太多，容易造成大量的死锁和锁超时。 回滚记录会占用大量存储空间，事务回滚时间长。在MySQL (opens new window)中，实际上每条记录在更 新的时候都会同时记录一条回滚操作。记录上的最新值，通过回滚操作，都可以得到前一个状态的值，sql 越 多，所需要保存的回滚数据就越多。 执行时间长，容易造成主从延迟，主库上必须等事务执行完成才会写入binlog，再传给备库。所以，如果一个 主库上的语句执行10分钟，那这个事务很可能就会导致从库延迟10分钟",
    "keyPoints": [
      "单条 UPDATE 在事务语义下的原子性边界，分析大事务造成的长时间持锁、undo 膨胀、复制延迟和恢复成本，并给出拆批原则"
    ],
    "followUps": [
      "滥用事务，或者一个事务里有特别多sql的弊端？"
    ],
    "tags": [
      "MySQL",
      "UPDATE 原子性",
      "大事务风险",
      "UPDATE",
      "UPDATE 原子性与大事务风险"
    ],
    "sourceRef": "MySQL PDF p.44：一条 UPDATE 是否原子；一个事务包含很多 SQL 的弊端",
    "source": "builtin",
    "order": 125
  },
  {
    "id": "java-redis-8f0e917029",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "如何理解ZSet、跳表与范围查询？",
    "coreAnswer": "用过 zset 实现排行榜的功能。 以博文点赞排名为例，小林发表了五篇博文，分别获得赞为 200、40、100、50、150。 # arcticle:1 文章获得了200个赞 > ZADD user:xiaolin:ranking 200 arcticle:1 (integer) 1 Zset 类型的底层数据结构是由压缩列表或跳表实现的： 如果有序集合的元素个数小于 128 个，并且每个元素的值小于 64 字节时，Redis 会使用压缩列表作为 Zset 类型的底层数据结构； 如果有序集合的元素不满足上面的条件，Redis 会使用跳表作为 Zset 类型的底层数据结构；…",
    "explanation": "ZSet用过吗：用过 zset 实现排行榜的功能。 以博文点赞排名为例，小林发表了五篇博文，分别获得赞为 200、40、100、50、150。 # arcticle:1 文章获得了200个赞 > ZADD user:xiaolin:ranking 200 arcticle:1 (integer) 1 Zset 底层是怎么实现的？：Zset 类型的底层数据结构是由压缩列表或跳表实现的： 如果有序集合的元素个数小于 128 个，并且每个元素的值小于 64 字节时，Redis 会使用压缩列表作为 Zset 类型的底层数据结构； 如果有序集合的元素不满足上面的条件，Redis 会使用跳表作为 Zset 类型的底层数据结构； 在 Redis 7.0 中，压缩列表数据结构已经废弃了，交由 listpack 数据结构来实现了。 跳表是怎么设置层高的？：跳表在创建节点时候，会生成范围为[0-1]的一个随机数，如果这个随机数小于 0.25（相当于概率 25%），那么层 数就增加 1 层，然后继续生成下一个随机数，直到随机数的结果大于 0.25 结束，最终确定该节点的层数。 Redis为什么使用跳表而不是用B+树?：Redis 是内存数据库，跳表在实现简单性、写入性能、内存访问模式等方面的综合优势，使其成为更合适的选择。 维度 跳表优势 B+ 树劣势 内存访问 符合CPU缓存局部性，指针跳转更高效 节点结构复杂，缓存不友好 实现复杂度 代码简洁，无复杂平衡操作 节点分裂/合并逻辑复杂，代码量大 写入性能 插入/删除仅需调整局部指针 插入可能触发递归节点分裂，成本高 内存占用 结构紧凑，无内部碎片 节点预分配可能浪费内存 Redis 选择使用跳表（Skip List）而不是 B+ 树来实现有序集合（Sorted Set）等数据结构，是经过多方面权衡后的 结果。以下是详细的原因分析： 1、内存结构与访问模式的差异 B+ 树的特性 磁盘友好：B+ 树的设计目标是优化磁盘I/O，通过减少树的高度来降低磁盘寻道次数（例如，一个3层的B+树 可以管理数百万数据）。 节点填充率高：每个节点存储多个键值（Page/Block），适合批量读写。…",
    "keyPoints": [
      "能先说明小集合使用 listpack，大集合使用 dict 加 skiplist：dict 支撑 member 到 score 的快速定位，skiplist 支撑有序遍历与范围查询",
      "再说明旧版本小集合使用 ziplist 的差异、跳表查找和随机层高，以及相对 B+ 树的内存场景取舍"
    ],
    "followUps": [
      "Zset 底层是怎么实现的？",
      "跳表是怎么设置层高的？"
    ],
    "tags": [
      "Redis",
      "ZSet",
      "跳表",
      "范围查询",
      "ZSet、跳表与范围查询"
    ],
    "sourceRef": "Redis PDF p.2-6：ZSet 用过吗；底层怎么实现；跳表怎么实现和设置层高；为什么不用 B+ 树",
    "source": "builtin",
    "order": 126
  },
  {
    "id": "java-redis-cd74f968bb",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "主从复制与一致性边界应该如何理解？",
    "coreAnswer": "完全同步 完全同步发生在以下几种情况： 初次同步：当一个从服务器（slave）首次连接到主服务器（master）时，会进行一次完全同步。 从服务器数据丢失：如果从服务器数据由于某种原因（如断电）丢失，它会请求进行完全同步。 主服务器数据发生变化：如果从服务器长时间未与主服务器同步，导致数据差异太大，也可能触发完全同 步。 主从服务器间的第一次同步的过程可分为三个阶段： 第一阶段是建立链接、协商同步； 第二阶段是主服务器同步数据给从服务器； 第三阶段是主服务器发送新写操作命令给从服务器。 实现过程： 1. 从服务器发送SYNC命令：从服务器向主服务器发送 SYNC 命令，请求开始同步。…",
    "explanation": "Redis主从同步中的增量和完全同步怎么实现？：完全同步 完全同步发生在以下几种情况： 初次同步：当一个从服务器（slave）首次连接到主服务器（master）时，会进行一次完全同步。 从服务器数据丢失：如果从服务器数据由于某种原因（如断电）丢失，它会请求进行完全同步。 主服务器数据发生变化：如果从服务器长时间未与主服务器同步，导致数据差异太大，也可能触发完全同 步。 主从服务器间的第一次同步的过程可分为三个阶段： 第一阶段是建立链接、协商同步； 第二阶段是主服务器同步数据给从服务器； 第三阶段是主服务器发送新写操作命令给从服务器。 实现过程： 1. 从服务器发送SYNC命令：从服务器向主服务器发送 SYNC 命令，请求开始同步。 2. 主服务器生成RDB快照：接收到 SYNC 命令后，主服务器会保存当前数据集的状态到一个临时文件，这个过程 称为RDB（Redis Database）快照。 3. 传输RDB文件：主服务器将生成的RDB文件发送给从服务器。… redis主从和集群可以保证数据一致性吗 ？：redis 主从和集群在CAP理论都属于AP模型，即在面临网络分区时选择保证可用性和分区容忍性，而牺牲了强一致 性。这意味着在网络分区的情况下，Redis主从复制和集群可以继续提供服务并保持可用，但可能会出现部分节点 之间的数据不一致。",
    "keyPoints": [
      "全量与增量复制的触发和数据链路，说明复制偏移量、积压缓冲区、断线重连，并明确异步复制下的延迟、故障丢数据与最终一致性边界"
    ],
    "followUps": [
      "redis主从和集群可以保证数据一致性吗 ？"
    ],
    "tags": [
      "Redis",
      "主从复制",
      "一致性边界",
      "主从复制与一致性边界"
    ],
    "sourceRef": "Redis PDF p.24-27：主从同步中的增量和完全同步；主从和集群能否保证数据一致性",
    "source": "builtin",
    "order": 127
  },
  {
    "id": "java-redis-6d77ed27f4",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "大 Key 与热 Key 治理应该如何理解？",
    "coreAnswer": "通常以其接收到的Key被请求频率来判定，例如： QPS集中在特定的Key：Redis实例的总QPS（每秒查询率）为10,000，而其中一个Key的每秒访问量达到了 7,000。 带宽使用率集中在特定的Key：对一个拥有上千个成员且总大小为1 MB的HASH Key每秒发送大量的 HGETALL操作请求。 CPU使用时间占比集中在特定的Key：对一个拥有数万个成员的Key（ZSET类型）每秒发送大量的ZRANGE操 作请求。",
    "explanation": "什么是热key？：通常以其接收到的Key被请求频率来判定，例如： QPS集中在特定的Key：Redis实例的总QPS（每秒查询率）为10,000，而其中一个Key的每秒访问量达到了 7,000。 带宽使用率集中在特定的Key：对一个拥有上千个成员且总大小为1 MB的HASH Key每秒发送大量的 HGETALL操作请求。 CPU使用时间占比集中在特定的Key：对一个拥有数万个成员的Key（ZSET类型）每秒发送大量的ZRANGE操 作请求。",
    "keyPoints": [
      "“大”与“热”的判定维度和危害，说明 bigkeys、hotkeys、采样监控等识别思路，并分别给出拆分、渐进或异步删除、本地缓存、多副本、读写分散和限流方案"
    ],
    "followUps": [
      "“大”与“热”的判定维度和危害，说明 bigkeys、hotkeys、采样监控等识别思路，并分别给出拆分、渐进或异步删除、本地缓存、多副本、读写分散和限流方案？"
    ],
    "tags": [
      "Redis",
      "大 Key 与热 Key 治理",
      "Key"
    ],
    "sourceRef": "Redis PDF p.39-40：大 Key 是什么、缺点和解决方案；什么是热 Key、如何解决",
    "source": "builtin",
    "order": 128
  },
  {
    "id": "java-redis-458314a51a",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "I/O 多路复用与网络事件模型应该如何理解？",
    "coreAnswer": "因为 Redis 是跑在「单线程」中的，所有的操作都是按照顺序线性执行的，但是由于读写操作等待用户输入 或 输 出都是阻塞的，所以 I/O 操作在一般情况下往往不能直接返回，这会导致某一文件的 I/O 阻塞导，致整个进程无法 对其它客户提供服务。而 I/O 多路复用就是为了解决这个问题而出现的。为了让单线程(进程)的服务端应用同时处 理多个客户端的事件，Redis 采用了 IO 多路复用机制。 这里“多路”指的是多个网络连接客户端，“复用”指的是复用同一个线程(单进程)。I/O 多路复用其实是使用一个线程 来检查多个 Socket 的就绪状态，在单个线程中通过记录跟踪每一个 socket（I/O流）的状态来管理处理多个 I/O 流。…",
    "explanation": "为什么 Redis 中要使用 I/O 多路复用这种技术呢？：因为 Redis 是跑在「单线程」中的，所有的操作都是按照顺序线性执行的，但是由于读写操作等待用户输入 或 输 出都是阻塞的，所以 I/O 操作在一般情况下往往不能直接返回，这会导致某一文件的 I/O 阻塞导，致整个进程无法 对其它客户提供服务。而 I/O 多路复用就是为了解决这个问题而出现的。为了让单线程(进程)的服务端应用同时处 理多个客户端的事件，Redis 采用了 IO 多路复用机制。 这里“多路”指的是多个网络连接客户端，“复用”指的是复用同一个线程(单进程)。I/O 多路复用其实是使用一个线程 来检查多个 Socket 的就绪状态，在单个线程中通过记录跟踪每一个 socket（I/O流）的状态来管理处理多个 I/O 流。… Redis的网络模型是怎样的？：Redis 6.0 版本之前，是用的是单Reactor单线程的模式 单 Reactor 单进程的方案因为全部工作都在同一个进程内完成，所以实现起来比较简单，不需要考虑进程间通信， 也不用担心多进程竞争。 但是，这种方案存在 2 个缺点： 第一个缺点，因为只有一个进程，无法充分利用 多核 CPU 的性能； 第二个缺点，Handler 对象在业务处理时，整个进程是无法处理其他连接的事件的，如果业务处理耗时比较 长，那么就造成响应的延迟； 所以，单 Reactor 单进程的方案不适用计算机密集型的场景，只适用于业务处理非常快速的场景。 Redis 是由 C 语言实现的，在 Redis 6.0 版本之前采用的正是「单 Reactor 单进程」的方案，因为 Redis 业务处理 主要是在内存中完成，操作的速度是很快的，性能瓶颈不在 CPU 上，所以 Redis 对于命令的处理是单进程的方 案。…",
    "keyPoints": [
      "多个连接的可读写事件、事件循环和命令处理链路解释 I/O 多路复用，比较 select、poll、epoll 的核心差异，并说明网络 I/O 多线程不改变命令主要串行执行"
    ],
    "followUps": [
      "Redis的网络模型是怎样的？"
    ],
    "tags": [
      "Redis",
      "O 多路复用",
      "网络事件模型",
      "I",
      "O",
      "I/O 多路复用与网络事件模型"
    ],
    "sourceRef": "Redis PDF p.13-15：Redis 怎么实现 I/O 多路复用；网络模型怎样",
    "source": "builtin",
    "order": 129
  },
  {
    "id": "java-redis-b70888026f",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "如何理解原子性、Lua 与 Redis 事务？",
    "coreAnswer": "redis 执行一条命令的时候是具备原子性的，因为 redis 执行命令的时候是单线程来处理的，不存在多线程安全的 问题。 如果要保证 2 条命令的原子性的话，可以考虑用 lua 脚本，将多个操作写到一个 Lua 脚本中，Redis 会把整个 Lua 脚本作为一个整体执行，在执行的过程中不会被其他命令打断，从而保证了 Lua 脚本中操作的原子性。 比如说，在用 redis 实现分布式锁的场景下，解锁期间涉及 2 个操作，分别是先判断锁是不是自己的，是自己的才 能删除锁，为了保证这 2 个操作的原子性，会通过 lua 脚本来保证原子性。…",
    "explanation": "如何实现redis 原子性？：redis 执行一条命令的时候是具备原子性的，因为 redis 执行命令的时候是单线程来处理的，不存在多线程安全的 问题。 如果要保证 2 条命令的原子性的话，可以考虑用 lua 脚本，将多个操作写到一个 Lua 脚本中，Redis 会把整个 Lua 脚本作为一个整体执行，在执行的过程中不会被其他命令打断，从而保证了 Lua 脚本中操作的原子性。 比如说，在用 redis 实现分布式锁的场景下，解锁期间涉及 2 个操作，分别是先判断锁是不是自己的，是自己的才 能删除锁，为了保证这 2 个操作的原子性，会通过 lua 脚本来保证原子性。 // 释放锁时，先比较 unique_value 是否相等，避免锁的误释放 if redis.call(\"get\",KEYS[1]) == ARGV[1] then return redis.call(\"del\",KEYS[1]) else return 0 end 除了lua有没有什么也能保证redis的原子性？：redis 事务也可以保证多个操作的原子性。 如果 redis 事务正常执行，没有发生任何错误，那么使用 MULTI 和 EXEC 配合使用，就可以保证多个操作都完成。 但是，如果事务执行发生错误了，就没办法保证原子性了。比如说 2 个操作，第一个操作执行成果了，但是第二个 操作执行的时候，命令出错了，那事务并不会回滚，因为Redis 中并没有提供回滚机制。 举个小例子。事务中的 LPOP 命令对 String 类型数据进行操作，入队时没有报错，但是，在 EXEC 执行时报错了。 LPOP 命令本身没有执行成功，但是事务中的 DECR 命令却成功执行了。…",
    "keyPoints": [
      "单条命令原子性、Lua 脚本整体执行、MULTI 和 EXEC 的队列语义及 WATCH 乐观检查，明确 Redis 事务不提供传统数据库式执行失败回滚"
    ],
    "followUps": [
      "除了lua有没有什么也能保证redis的原子性？"
    ],
    "tags": [
      "Redis",
      "原子性",
      "Lua",
      "Redis 事务",
      "原子性、Lua 与 Redis 事务"
    ],
    "sourceRef": "Redis PDF p.15-16：如何实现 Redis 原子性；除了 Lua 还有什么保证原子性",
    "source": "builtin",
    "order": 130
  },
  {
    "id": "java-redis-2067d801f3",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "如何理解Sentinel 监控、故障转移与选主？",
    "coreAnswer": "在 Redis 的主从架构中，由于主从模式是读写分离的，如果主节点（master）挂了，那么将没有主节点来服务客 户端的写操作请求，也没有主节点给从节点（slave）进行数据同步了。 这时如果要恢复服务的话，需要人工介入，选择一个「从节点」切换为「主节点」，然后让其他从节点指向新的主 节点，同时还需要通知上游那些连接 Redis 主节点的客户端，将其配置中的主节点 IP 地址更新为「新主节点」的 IP 地址。 这样也不太“智能”了，要是有一个节点能监控「主节点」的状态，当发现主节点挂了，它自动将一个「从节点」切 换为「主节点」的话，那么可以节省我们很多事情啊！…",
    "explanation": "哨兵机制原理是什么？：在 Redis 的主从架构中，由于主从模式是读写分离的，如果主节点（master）挂了，那么将没有主节点来服务客 户端的写操作请求，也没有主节点给从节点（slave）进行数据同步了。 这时如果要恢复服务的话，需要人工介入，选择一个「从节点」切换为「主节点」，然后让其他从节点指向新的主 节点，同时还需要通知上游那些连接 Redis 主节点的客户端，将其配置中的主节点 IP 地址更新为「新主节点」的 IP 地址。 这样也不太“智能”了，要是有一个节点能监控「主节点」的状态，当发现主节点挂了，它自动将一个「从节点」切 换为「主节点」的话，那么可以节省我们很多事情啊！ Redis 在 2.8 版本以后提供的哨兵（*Sentinel*）机制，它的作用是实现主从节点故障转移。它会监测主节点 是否存活，如果发现主节点挂了，它就会选举一个从节点切换为主节点，并且把新主节点的相关信息通知给从节点 和客户端。…",
    "keyPoints": [
      " Sentinel 的监控、主观下线、客观下线、领导者协商与故障转移链路，概括从库优先级、复制进度和稳定标识等选主依据，并明确仍可能丢失未复制数据"
    ],
    "followUps": [
      " Sentinel 的监控、主观下线、客观下线、领导者协商与故障转移链路，概括从库优先级、复制进度和稳定标识等选主依据，并明确仍可能丢失未复制数据？"
    ],
    "tags": [
      "Redis",
      "Sentinel 监控",
      "故障转移",
      "选主",
      "Sentinel",
      "Sentinel 监控、故障转移与选主"
    ],
    "sourceRef": "Redis PDF p.27-33：哨兵机制原理；哨兵选主算法",
    "source": "builtin",
    "order": 131
  },
  {
    "id": "java-redis-74022f2614",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "如何理解Redis Cluster 分片与限制？",
    "coreAnswer": "当 Redis 缓存数据量大到一台服务器无法缓存时，就需要使用 Redis 切片集群（Redis Cluster ）方案，它将数据 分布在不同的服务器上，以此来降低系统对单主节点的依赖，从而提高 Redis 服务的读写性能。 Redis Cluster 方案采用哈希槽（Hash Slot），来处理数据和节点之间的映射关系。在 Redis Cluster 方案中，一 个切片集群共有 16384 个哈希槽，这些哈希槽类似于数据分区，每个键值对都会根据它的 key，被映射到一个哈希 槽中，具体执行过程分为两大步： 根据键值对的 key，按照 CRC16 算法计算一个 16 bit 的值。…",
    "explanation": "Redis集群的模式了解吗 优缺点了解吗：当 Redis 缓存数据量大到一台服务器无法缓存时，就需要使用 Redis 切片集群（Redis Cluster ）方案，它将数据 分布在不同的服务器上，以此来降低系统对单主节点的依赖，从而提高 Redis 服务的读写性能。 Redis Cluster 方案采用哈希槽（Hash Slot），来处理数据和节点之间的映射关系。在 Redis Cluster 方案中，一 个切片集群共有 16384 个哈希槽，这些哈希槽类似于数据分区，每个键值对都会根据它的 key，被映射到一个哈希 槽中，具体执行过程分为两大步： 根据键值对的 key，按照 CRC16 算法计算一个 16 bit 的值。 再用 16bit 值对 16384 取模，得到 0~16383 范围内的模数，每个模数代表一个相应编号的哈希槽。 接下来的问题就是，这些哈希槽怎么被映射到具体的 Redis 节点上的呢？…",
    "keyPoints": [
      "哈希槽、键到槽映射、主从节点和故障转移，解释 MOVED 与 ASK",
      "明确跨槽多 Key 操作和事务受限、同槽时可执行，并能用 hash tag 让相关键落到同一槽，同时说明扩容迁移与客户端复杂度"
    ],
    "followUps": [
      "哈希槽、键到槽映射、主从节点和故障转移，解释 MOVED 与 ASK？",
      "明确跨槽多 Key 操作和事务受限、同槽时可执行，并能用 hash tag 让相关键落到同一槽，同时说明扩容迁移与客户端复杂度？"
    ],
    "tags": [
      "Redis",
      "Redis Cluster 分片",
      "限制",
      "Cluster",
      "Redis Cluster 分片与限制"
    ],
    "sourceRef": "Redis PDF p.33-34：Redis 集群模式及优缺点",
    "source": "builtin",
    "order": 132
  },
  {
    "id": "java-redis-07f894f132",
    "deckId": "java-basics-sample",
    "topic": "Redis",
    "importance": "A",
    "score": 7,
    "question": "如何理解布隆过滤器与缓存穿透？",
    "coreAnswer": "布隆过滤器由「初始值都为 0 的位图数组」和「 N 个哈希函数」两部分组成。当我们在写入数据库数据时，在布 隆过滤器里做个标记，这样下次查询数据是否在数据库时，只需要查询布隆过滤器，如果查询到数据没有被标记， 说明不在数据库中。 布隆过滤器会通过 3 个操作完成标记： 第一步，使用 N 个哈希函数分别对数据做哈希计算，得到 N 个哈希值； 第二步，将第一步得到的 N 个哈希值对位图数组的长度取模，得到每个哈希值在位图数组的对应位置。 第三步，将每个哈希值在位图数组的对应位置的值设置为 1； 举个例子，假设有一个位图数组长度为 8，哈希函数 3 个的布隆过滤器。…",
    "explanation": "布隆过滤器原理介绍一下：布隆过滤器由「初始值都为 0 的位图数组」和「 N 个哈希函数」两部分组成。当我们在写入数据库数据时，在布 隆过滤器里做个标记，这样下次查询数据是否在数据库时，只需要查询布隆过滤器，如果查询到数据没有被标记， 说明不在数据库中。 布隆过滤器会通过 3 个操作完成标记： 第一步，使用 N 个哈希函数分别对数据做哈希计算，得到 N 个哈希值； 第二步，将第一步得到的 N 个哈希值对位图数组的长度取模，得到每个哈希值在位图数组的对应位置。 第三步，将每个哈希值在位图数组的对应位置的值设置为 1； 举个例子，假设有一个位图数组长度为 8，哈希函数 3 个的布隆过滤器。 在数据库写入数据 x 后，把数据 x 标记在布隆过滤器时，数据 x 会被 3 个哈希函数分别计算出 3 个哈希值，然后 在对这 3 个哈希值对 8 取模，假设取模的结果为 1、4、6，然后把位图数组的第 1、4、6 位置的值设置为 1。…",
    "keyPoints": [
      "位图加多个哈希函数的写入和判断过程，解释“可能误判但不漏判”、删除困难与容量误判率权衡，并说明初始化、更新和绕过后的兜底"
    ],
    "followUps": [
      "位图加多个哈希函数的写入和判断过程，解释“可能误判但不漏判”、删除困难与容量误判率权衡，并说明初始化、更新和绕过后的兜底？"
    ],
    "tags": [
      "Redis",
      "布隆过滤器",
      "缓存穿透",
      "布隆过滤器与缓存穿透"
    ],
    "sourceRef": "Redis PDF p.46-47：布隆过滤器原理",
    "source": "builtin",
    "order": 133
  },
  {
    "id": "java-network-285b5d6e35",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解OSI 与 TCP/IP 网络分层？",
    "coreAnswer": "OSI七层模型 为了使得多种设备能通过网络相互通信，和为了解决各种不同设备在网络互联中的兼容性问题，国际标准化组织制 定了开放式系统互联通信参考模型（Open System Interconnection Reference Model），也就是 OSI 网络模型，该 模型主要有 7 层，分别是应用层、表示层、会话层、传输层、网络层、数据链路层以及物理层。 每一层负责的职能都不同，如下： 应用层，负责给应用程序提供统一的接口； 表示层，负责把数据转换成兼容另一个系统能识别的格式； 会话层，负责建立、管理和终止表示层实体之间的通信会话； 传输层，负责端到端的数据传输； 网络层，负责数据的路由、转发、分片；…",
    "explanation": "网络OSI模型和TCP/IP模型分别介绍一下：OSI七层模型 为了使得多种设备能通过网络相互通信，和为了解决各种不同设备在网络互联中的兼容性问题，国际标准化组织制 定了开放式系统互联通信参考模型（Open System Interconnection Reference Model），也就是 OSI 网络模型，该 模型主要有 7 层，分别是应用层、表示层、会话层、传输层、网络层、数据链路层以及物理层。 每一层负责的职能都不同，如下： 应用层，负责给应用程序提供统一的接口； 表示层，负责把数据转换成兼容另一个系统能识别的格式； 会话层，负责建立、管理和终止表示层实体之间的通信会话； 传输层，负责端到端的数据传输； 网络层，负责数据的路由、转发、分片； 数据链路层，负责数据的封帧和差错检测，以及 MAC 寻址； 物理层，负责在物理网络中传输数据帧； 由于 OSI 模型实在太复杂，提出的也只是概念理论上的分层，并没有提供具体的实现方案。… 应用层有哪些协议？：HTTP、HTTPS、CDN、DNS、FTP 都是应用层协议",
    "keyPoints": [
      "能对照 OSI 七层与 TCP/IP 四层说明各层职责、数据单元和代表协议，准确定位 TCP、IP、HTTP、DNS，不混淆传输层与网络层"
    ],
    "followUps": [
      "应用层有哪些协议？"
    ],
    "tags": [
      "计算机网络",
      "OSI",
      "TCP",
      "IP 网络分层",
      "IP",
      "OSI 与 TCP/IP 网络分层"
    ],
    "sourceRef": "网络 PDF p.1-4：网络 OSI 模型和 TCP/IP 模型；TCP、IP 分别位于哪一层；应用层有哪些协议",
    "source": "builtin",
    "order": 134
  },
  {
    "id": "java-network-200cde3eaf",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解HTTP/1.1 与 HTTP/2？",
    "coreAnswer": "HTTP/2 相比 HTTP/1.1 性能上的改进： 头部压缩：HTTP/2 会压缩头（Header）如果你同时发出多个请求，他们的头是一样的或是相似的，那么， 协议会帮你消除重复的部分。这就是所谓的 HPACK 算法：在客户端和服务器同时维护一张头信息表，所有字 段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。 二进制格式：HTTP/2 不再像 HTTP/1.1 里的纯文本形式的报文，而是全面采用了二进制格式，头信息和数据 体都是二进制，并且统称为帧（frame）：头信息帧（Headers Frame）和数据帧（Data Frame）。…",
    "explanation": "Http1.1和2.0的区别是什么？：HTTP/2 相比 HTTP/1.1 性能上的改进： 头部压缩：HTTP/2 会压缩头（Header）如果你同时发出多个请求，他们的头是一样的或是相似的，那么， 协议会帮你消除重复的部分。这就是所谓的 HPACK 算法：在客户端和服务器同时维护一张头信息表，所有字 段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。 二进制格式：HTTP/2 不再像 HTTP/1.1 里的纯文本形式的报文，而是全面采用了二进制格式，头信息和数据 体都是二进制，并且统称为帧（frame）：头信息帧（Headers Frame）和数据帧（Data Frame）。这样 虽然对人不友好，但是对计算机非常友好，因为计算机只懂二进制，那么收到报文后，无需再将明文的报文 转成二进制，而是直接解析二进制报文，这增加了数据传输的效率。 并发传输：引出了 Stream 概念，多个 Stream 复用在一条 TCP 连接。…",
    "keyPoints": [
      "长连接、管线化、二进制分帧、头部压缩、流与多路复用",
      "明确 HTTP/2 解决应用层队头阻塞，但基于单条 TCP 连接时仍存在 TCP 层队头阻塞"
    ],
    "followUps": [
      "长连接、管线化、二进制分帧、头部压缩、流与多路复用？",
      "明确 HTTP/2 解决应用层队头阻塞，但基于单条 TCP 连接时仍存在 TCP 层队头阻塞？"
    ],
    "tags": [
      "计算机网络",
      "HTTP",
      "1.1",
      "HTTP/1.1 与 HTTP/2"
    ],
    "sourceRef": "网络 PDF p.17：HTTP/1.1 和 HTTP/2.0 的区别",
    "source": "builtin",
    "order": 135
  },
  {
    "id": "java-network-e5576523f1",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "JWT 结构、集群与失效治理应该如何理解？",
    "coreAnswer": "无状态性：JWT是无状态的令牌，不需要在服务器端存储会话信息。相反，JWT令牌中包含了所有必要的信 息，如用户身份、权限等。这使得JWT在分布式系统中更加适用，可以方便地进行扩展和跨域访问。 安全性：JWT使用密钥对令牌进行签名，确保令牌的完整性和真实性。只有持有正确密钥的服务器才能对令牌 进行验证和解析。这种方式比传统的基于会话和Cookie的验证更加安全，有效防止了CSRF（跨站请求伪造） 等攻击。 跨域支持：JWT令牌可以在不同域之间传递，适用于跨域访问的场景。通过在请求的头部或参数中携带JWT令 牌，可以实现无需Cookie的跨域身份验证。…",
    "explanation": "JWT 令牌和传统方式有什么区别？：无状态性：JWT是无状态的令牌，不需要在服务器端存储会话信息。相反，JWT令牌中包含了所有必要的信 息，如用户身份、权限等。这使得JWT在分布式系统中更加适用，可以方便地进行扩展和跨域访问。 安全性：JWT使用密钥对令牌进行签名，确保令牌的完整性和真实性。只有持有正确密钥的服务器才能对令牌 进行验证和解析。这种方式比传统的基于会话和Cookie的验证更加安全，有效防止了CSRF（跨站请求伪造） 等攻击。 跨域支持：JWT令牌可以在不同域之间传递，适用于跨域访问的场景。通过在请求的头部或参数中携带JWT令 牌，可以实现无需Cookie的跨域身份验证。 JWT 令牌都有哪些字段？（ 没答上来，忘了有哪些，没想到会问）：JWT令牌由三个部分组成：头部（Header）、载荷（Payload）和签名（Signature）。其中，头部和载荷均为 JSON格式，使用Base64编码进行序列化，而签名部分是对头部、载荷和密钥进行签名后的结果。 JWT 令牌为什么能解决集群部署，什么是集群部署？（ 答上来了）：在传统的基于会话和Cookie的身份验证方式中，会话信息通常存储在服务器的内存或数据库中。但在集群部署中， 不同服务器之间没有共享的会话信息，这会导致用户在不同服务器之间切换时需要重新登录，或者需要引入额外的 共享机制（如Redis），增加了复杂性和性能开销。 而JWT令牌通过在令牌中包含所有必要的身份验证和会话信息，使得服务器无需存储会话信息，从而解决了集群部 署中的身份验证和会话管理问题。当用户进行登录认证后，服务器将生成一个JWT令牌并返回给客户端。客户端在 后续的请求中携带该令牌，服务器可以通过对令牌进行验证和解析来获取用户身份和权限信息，而无需访问共享的 会话存储。 由于JWT令牌是自包含的，服务器可以独立地对令牌进行验证，而不需要依赖其他服务器或共享存储。这使得集群 中的每个服务器都可以独立处理请求，提高了系统的可伸缩性和容错性。 jwt的缺点是什么？：JWT 一旦派发出去，在失效之前都是有效的，没办法即使撤销JWT。 要解决这个问题的话，得在业务层增加判断逻辑，比如增加黑名单机制。使用内存数据库比如 Redis 维护一个黑名 单，如果想让某个 JWT 失效的话就直接将这个 JWT 加入到 黑名单 即可。然后，每次使用 JWT 进行请求的话都会 先判断这个 JWT 是否存在于黑名单中。",
    "keyPoints": [
      " Header、Payload、Signature 与签名校验，解释无服务端会话为何利于集群",
      "明确 JWT 默认不可主动失效，能给出短有效期、刷新令牌轮换、黑名单或令牌版本等治理并处理泄露"
    ],
    "followUps": [
      "JWT 令牌都有哪些字段？（ 没答上来，忘了有哪些，没想到会问）？",
      "JWT 令牌为什么能解决集群部署，什么是集群部署？（ 答上来了）？"
    ],
    "tags": [
      "计算机网络",
      "JWT 结构",
      "集群",
      "失效治理",
      "JWT",
      "JWT 结构、集群与失效治理"
    ],
    "sourceRef": "网络 PDF p.21-23：JWT 与传统方式的区别；字段；集群部署；缺点；泄露处理；前端存储",
    "source": "builtin",
    "order": 136
  },
  {
    "id": "java-network-2f72ac5567",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解TIME_WAIT 与 2MSL？",
    "coreAnswer": "MSL 是 Maximum Segment Lifetime，报文最大生存时间，它是任何报文在网络上存在的最长时间，超过这个时 间报文将被丢弃。因为 TCP 报文基于是 IP 协议的，而 IP 头中有一个 TTL 字段，是 IP 数据报可以经过的最大路由 数，每经过一个处理他的路由器此值就减 1，当此值为 0 则数据报将被丢弃，同时发送 ICMP 报文通知源主机。 MSL 与 TTL 的区别： MSL 的单位是时间，而 TTL 是经过路由跳数。所以 MSL 应该要大于等于 TTL 消耗为 0 的时 间，以确保报文已被自然消亡。…",
    "explanation": "为什么四次挥手之后要等2MSL?：MSL 是 Maximum Segment Lifetime，报文最大生存时间，它是任何报文在网络上存在的最长时间，超过这个时 间报文将被丢弃。因为 TCP 报文基于是 IP 协议的，而 IP 头中有一个 TTL 字段，是 IP 数据报可以经过的最大路由 数，每经过一个处理他的路由器此值就减 1，当此值为 0 则数据报将被丢弃，同时发送 ICMP 报文通知源主机。 MSL 与 TTL 的区别： MSL 的单位是时间，而 TTL 是经过路由跳数。所以 MSL 应该要大于等于 TTL 消耗为 0 的时 间，以确保报文已被自然消亡。 TTL 的值一般是 64，Linux 将 MSL 设置为 30 秒，意味着 Linux 认为数据报文经过 64 个路由器的时间不会超过 30 秒，如果超过了，就认为报文已经消失在网络中了。…",
    "keyPoints": [
      "能明确 TIME_WAIT 通常由主动关闭方进入，说明等待 2MSL 用于可靠处理最后 ACK 与避免旧连接报文污染新连接，并从短连接、主动关闭和端口资源解释服务端大量 TIME_WAIT"
    ],
    "followUps": [
      "能明确 TIME_WAIT 通常由主动关闭方进入，说明等待 2MSL 用于可靠处理最后 ACK 与避免旧连接报文污染新连接，并从短连接、主动关闭和端口资源解释服务端大量 TIME_WAIT？"
    ],
    "tags": [
      "计算机网络",
      "TIME_WAIT",
      "2MSL",
      "TIME",
      "WAIT",
      "MSL"
    ],
    "sourceRef": "网络 PDF p.47-54：为什么挥手后等待 2MSL；服务端大量 TIME_WAIT 的原因",
    "source": "builtin",
    "order": 137
  },
  {
    "id": "java-network-d1000951d8",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解分层网络故障排查？",
    "coreAnswer": "最直接的办法就是抓包，排查的思路大概有： 1. 先确定是服务端的问题，还是客户端的问题。先确认浏览器是否可以访问其他网站，如果不可以，说明客户 端网络自身的问题，然后检查客户端网络配置（连接wiﬁ正不正常，有没有插网线）；如果可以正常其他网 页，说明客户端网络是可以正常上网的。 2. 如果客户端网络没问题，就抓包确认 DNS 是否解析出了 IP 地址，如果没有解析出来，说明域名写错了，如果 解析出了 IP 地址，抓包确认有没有和服务端建立三次握手，如果能成功建立三次握手，并且发出了 HTTP 请 求，但是就是没有显示页面，可以查看服务端返回的响应码： 如果是404错误码，检查输入的url是否正确；…",
    "explanation": "网页非常慢转圈圈的时候，要定位问题需要从哪些角度？：最直接的办法就是抓包，排查的思路大概有： 1. 先确定是服务端的问题，还是客户端的问题。先确认浏览器是否可以访问其他网站，如果不可以，说明客户 端网络自身的问题，然后检查客户端网络配置（连接wiﬁ正不正常，有没有插网线）；如果可以正常其他网 页，说明客户端网络是可以正常上网的。 2. 如果客户端网络没问题，就抓包确认 DNS 是否解析出了 IP 地址，如果没有解析出来，说明域名写错了，如果 解析出了 IP 地址，抓包确认有没有和服务端建立三次握手，如果能成功建立三次握手，并且发出了 HTTP 请 求，但是就是没有显示页面，可以查看服务端返回的响应码： 如果是404错误码，检查输入的url是否正确； 如果是500，说明服务器此时有问题； 如果是200，F12看看前端代码有问题导致浏览器没有渲染出页面。 3. 如果客户端网络是正常的，但是访问速度很慢，导致很久才显示出来。… server a和server b，如何判断两个服务器正常连接？出错怎么办？：直不会发送数据给客户端，那么服务端是永远无法感知到客户端宕机这个事件的，也就是服务端的 TCP 连接将一 直处于 ESTABLISH 状态，占用着系统资源。 为了避免这种情况，TCP 搞了个保活机制。这个机制的原理是这样的：定义一个时间段，在这个时间段内，如果没 有任何连接相关的活动，TCP 保活机制会开始作用，每隔一个时间间隔，发送一个探测报文，该探测报文包含的数 据非常少，如果连续几个探测报文都没有得到响应，则认为当前的 TCP 连接已经死亡，系统内核将错误信息通知 给上层应用程序。… 服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?：如果客户端请求的接口没有响应，排查的方式： 检查接口IP地址是否正确，ping一下接口地址。 检查被测接口端口号是否正确，可以在本机Telnet接口的IP和端口号，检查端口号能否连通 检查服务器的防火墙是否关闭，如果是以为安全或者权限问题不能关闭，需要找运维进行策略配置，开放对 应的IP和端口。 检查你的客户端（浏览器、测试工具 (opens new window)），是否设置了网络代理，网络代理可以造成请求 失败。 如果客户端的请求有响应，但是返回了错误状态码，那么根据错误码做对应的排查： 400：客户端请求错误，比如请求参数格式错误 401：未授权，比如请求header里，缺乏必要的信息头。…",
    "keyPoints": [
      "能按客户端配置、DNS、路由与链路、端口和防火墙、TCP、TLS、HTTP、代理、应用及依赖逐层缩小范围",
      "明确 ping 检查 ICMP 可达性，HTTP 成功还依赖更高层，ping 不通但 HTTP 可成功并不矛盾"
    ],
    "followUps": [
      "server a和server b，如何判断两个服务器正常连接？出错怎么办？",
      "服务端正常启动了，但是客户端请求不到有哪些原因?如何排查?"
    ],
    "tags": [
      "计算机网络",
      "分层网络故障排查"
    ],
    "sourceRef": "网络 PDF p.62-65：网页很慢如何定位；服务器间如何判断连接；服务端启动但请求不到；ping 不通但 HTTP 成功",
    "source": "builtin",
    "order": 138
  },
  {
    "id": "java-network-afa53d6c2e",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "HTTP 长连接、断连与报文边界应该如何理解？",
    "coreAnswer": "HTTP 协议采用的是「请求-应答」的模式，也就是客户端发起了请求，服务端才会返回响应，一来一回这样子。 由于 HTTP 是基于 TCP 传输协议实现的，客户端与服务端要进行 HTTP 通信前，需要先建立 TCP 连接，然后客户 端发送 HTTP 请求，服务端收到后就返回响应，至此「请求-应答」的模式就完成了，随后就会释放 TCP 连接。 如果每次请求都要经历这样的过程：建立 TCP -> 请求资源 -> 响应资源 -> 释放连接，那么此方式就是 HTTP 短连 接，如下图： 这样实在太累人了，一次连接只能请求一次资源。…",
    "explanation": "HTTP的长连接是什么？：HTTP 协议采用的是「请求-应答」的模式，也就是客户端发起了请求，服务端才会返回响应，一来一回这样子。 由于 HTTP 是基于 TCP 传输协议实现的，客户端与服务端要进行 HTTP 通信前，需要先建立 TCP 连接，然后客户 端发送 HTTP 请求，服务端收到后就返回响应，至此「请求-应答」的模式就完成了，随后就会释放 TCP 连接。 如果每次请求都要经历这样的过程：建立 TCP -> 请求资源 -> 响应资源 -> 释放连接，那么此方式就是 HTTP 短连 接，如下图： 这样实在太累人了，一次连接只能请求一次资源。 Http1.1和2.0的区别是什么？：HTTP/2 相比 HTTP/1.1 性能上的改进： 头部压缩：HTTP/2 会压缩头（Header）如果你同时发出多个请求，他们的头是一样的或是相似的，那么， 协议会帮你消除重复的部分。这就是所谓的 HPACK 算法：在客户端和服务器同时维护一张头信息表，所有字 段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。 二进制格式：HTTP/2 不再像 HTTP/1.1 里的纯文本形式的报文，而是全面采用了二进制格式，头信息和数据 体都是二进制，并且统称为帧（frame）：头信息帧（Headers Frame）和数据帧（Data Frame）。这样 虽然对人不友好，但是对计算机非常友好，因为计算机只懂二进制，那么收到报文后，无需再将明文的报文 转成二进制，而是直接解析二进制报文，这增加了数据传输的效率。 并发传输：引出了 Stream 概念，多个 Stream 复用在一条 TCP 连接。…",
    "keyPoints": [
      " Keep-Alive 复用 TCP 连接、连接关闭的主动与超时情形，并用 Content-Length、Transfer-Encoding 等 HTTP 规则解释 HTTP/1.1 报文边界"
    ],
    "followUps": [
      "Http1.1和2.0的区别是什么？"
    ],
    "tags": [
      "计算机网络",
      "HTTP 长连接",
      "断连",
      "报文边界",
      "HTTP",
      "HTTP 长连接、断连与报文边界"
    ],
    "sourceRef": "网络 PDF p.7-12、p.17：HTTP 长连接；默认端口；HTTP/1.1 如何拆包；TCP 连接何时中断",
    "source": "builtin",
    "order": 139
  },
  {
    "id": "java-network-0e287f8b49",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解HTTP、TCP 与 Socket 的关系？",
    "coreAnswer": "HTTP是应用层协议，定义了客户端和服务器之间交换的数据格式和规则；Socket是通信的一端，提供了网络通信 的接口；TCP是传输层协议，负责在网络中建立可靠的数据传输连接。它们在网络通信中扮演不同的角色和层次。 HTTP是一种用于传输超文本数据的应用层协议，用于在客户端和服务器之间传输和显示Web页面。 Socket是计算机网络中的一种抽象，用于描述通信链路的一端，提供了底层的通信接口，可实现不同计算机 之间的数据交换。 TCP是一种面向连接的、可靠的传输层协议，负责在通信的两端之间建立可靠的数据传输连接。",
    "explanation": "HTTP、SOCKET和TCP的区别：HTTP是应用层协议，定义了客户端和服务器之间交换的数据格式和规则；Socket是通信的一端，提供了网络通信 的接口；TCP是传输层协议，负责在网络中建立可靠的数据传输连接。它们在网络通信中扮演不同的角色和层次。 HTTP是一种用于传输超文本数据的应用层协议，用于在客户端和服务器之间传输和显示Web页面。 Socket是计算机网络中的一种抽象，用于描述通信链路的一端，提供了底层的通信接口，可实现不同计算机 之间的数据交换。 TCP是一种面向连接的、可靠的传输层协议，负责在通信的两端之间建立可靠的数据传输连接。",
    "keyPoints": [
      " HTTP 是应用层协议、TCP 是传输层协议、Socket 是操作系统提供的网络编程接口，用一次请求链路解释三者关系"
    ],
    "followUps": [
      " HTTP 是应用层协议、TCP 是传输层协议、Socket 是操作系统提供的网络编程接口，用一次请求链路解释三者关系？"
    ],
    "tags": [
      "计算机网络",
      "HTTP",
      "TCP",
      "Socket 的关系",
      "Socket",
      "HTTP、TCP 与 Socket 的关系"
    ],
    "sourceRef": "网络 PDF p.17：HTTP、Socket 和 TCP 的区别",
    "source": "builtin",
    "order": 140
  },
  {
    "id": "java-network-0a6b9c9dff",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解TCP 与 UDP 及基于 UDP 的 HTTP？",
    "coreAnswer": "连接：TCP 是面向连接的传输层协议，传输数据前先要建立连接；UDP 是不需要连接，即刻传输数据。 服务对象：TCP 是一对一的两点服务，即一条连接只有两个端点。UDP 支持一对一、一对多、多对多的交互 通信 可靠性：TCP 是可靠交付数据的，数据可以无差错、不丢失、不重复、按序到达。UDP 是尽最大努力交付， 不保证可靠交付数据。但是我们可以基于 UDP 传输协议实现一个可靠的传输协议，比如 QUIC 协议 拥塞控制、流量控制：TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。UDP 则没有，即使网络非 常拥堵了，也不会影响 UDP 的发送速率。…",
    "explanation": "TCP和UDP区别是什么？：连接：TCP 是面向连接的传输层协议，传输数据前先要建立连接；UDP 是不需要连接，即刻传输数据。 服务对象：TCP 是一对一的两点服务，即一条连接只有两个端点。UDP 支持一对一、一对多、多对多的交互 通信 可靠性：TCP 是可靠交付数据的，数据可以无差错、不丢失、不重复、按序到达。UDP 是尽最大努力交付， 不保证可靠交付数据。但是我们可以基于 UDP 传输协议实现一个可靠的传输协议，比如 QUIC 协议 拥塞控制、流量控制：TCP 有拥塞控制和流量控制机制，保证数据传输的安全性。UDP 则没有，即使网络非 常拥堵了，也不会影响 UDP 的发送速率。 首部开销：TCP 首部长度较长，会有一定的开销，首部在没有使用「选项」字段时是 20 个字节，如果使用了 「选项」字段则会变长的。UDP 首部只有 8 个字节，并且是固定不变的，开销较小。 传输方式：TCP 是流式传输，没有边界，但保证顺序和可靠。… 怎么用udp实现http？：UDP 是不可靠传输的，但基于 UDP 的 QUIC 协议 可以实现类似 TCP 的可靠性传输，在http3 就用了 quic 协议。 连接迁移：QUIC支持在网络变化时快速迁移连接，例如从WiFi切换到移动数据网络，以保持连接的可靠性。 重传机制：QUIC使用重传机制来确保丢失的数据包能够被重新发送，从而提高数据传输的可靠性。 前向纠错：QUIC可以使用前向纠错技术，在接收端修复部分丢失的数据，降低重传的需求，提高可靠性和传 输效率。 拥塞控制：QUIC内置了拥塞控制机制，可以根据网络状况动态调整数据传输速率，以避免网络拥塞和丢包， 提高可靠性。",
    "keyPoints": [
      "连接、可靠性、顺序、报文边界、拥塞控制和开销比较 TCP 与 UDP，并知道在 UDP 之上需要补充可靠与安全机制，HTTP/3 使用 QUIC 而非裸 UDP"
    ],
    "followUps": [
      "怎么用udp实现http？"
    ],
    "tags": [
      "计算机网络",
      "TCP",
      "UDP 及基于 UDP 的 HTTP",
      "UDP",
      "HTTP",
      "TCP 与 UDP 及基于 UDP 的 HTTP"
    ],
    "sourceRef": "网络 PDF p.54-55：TCP 和 UDP 的区别；怎么用 UDP 实现 HTTP",
    "source": "builtin",
    "order": 141
  },
  {
    "id": "java-network-b6cc74b677",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解TCP 粘包与应用层拆包？",
    "coreAnswer": "粘包的问题出现是因为不知道一个用户消息的边界在哪，如果知道了边界在哪，接收方就可以通过边界来划分出有 效的用户消息。 一般有三种方式分包的方式： 固定长度的消息； 特殊字符作为边界； 自定义消息结构。 固定长度的消息 这种是最简单方法，即每个用户消息都是固定长度的，比如规定一个消息的长度是 64 个字节，当接收方接满 64 个字节，就认为这个内容是一个完整且有效的消息。 但是这种方式灵活性不高，实际中很少用。 特殊字符作为边界 我们可以在两个用户消息之间插入一个特殊的字符串，这样接收方在接收数据时，读到了这个特殊字符，就把认为 已经读完一个完整的消息。 HTTP 是一个非常好的例子。…",
    "explanation": "tcp粘包怎么解决？：粘包的问题出现是因为不知道一个用户消息的边界在哪，如果知道了边界在哪，接收方就可以通过边界来划分出有 效的用户消息。 一般有三种方式分包的方式： 固定长度的消息； 特殊字符作为边界； 自定义消息结构。 固定长度的消息 这种是最简单方法，即每个用户消息都是固定长度的，比如规定一个消息的长度是 64 个字节，当接收方接满 64 个字节，就认为这个内容是一个完整且有效的消息。 但是这种方式灵活性不高，实际中很少用。 特殊字符作为边界 我们可以在两个用户消息之间插入一个特殊的字符串，这样接收方在接收数据时，读到了这个特殊字符，就把认为 已经读完一个完整的消息。 HTTP 是一个非常好的例子。 HTTP 通过设置回车符、换行符作为 HTTP 报文协议的边界。 有一点要注意，这个作为边界点的特殊字符，如果刚好消息内容里有这个特殊字符，我们要对这个字符转义，避免 被接收方当作消息的边界点而解析到无效的数据。…",
    "keyPoints": [
      "能明确 TCP 粘包本质是字节流没有消息边界，不是数据被错误粘连",
      "固定长度、分隔符、长度字段和自描述协议等应用层拆包方案"
    ],
    "followUps": [
      "能明确 TCP 粘包本质是字节流没有消息边界，不是数据被错误粘连？",
      "固定长度、分隔符、长度字段和自描述协议等应用层拆包方案？"
    ],
    "tags": [
      "计算机网络",
      "TCP 粘包",
      "应用层拆包",
      "TCP",
      "TCP 粘包与应用层拆包"
    ],
    "sourceRef": "网络 PDF p.55-56：TCP 粘包怎么解决",
    "source": "builtin",
    "order": 142
  },
  {
    "id": "java-network-52d5f0ebbe",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "浏览器打开网页的完整网络过程应该如何理解？",
    "coreAnswer": "解析URL：分析 URL 所需要使用的传输协议和请求的资源路径。如果输入的 URL 中的协议或者主机名不合 法，将会把地址栏中输入的内容传递给搜索引擎。如果没有问题，浏览器会检查 URL 中是否出现了非法字 符，则对非法字符进行转义后在进行下一过程。 缓存判断：浏览器缓存 → 系统缓存（hosts 文件） → 路由器缓存 → ISP 的 DNS 缓存，如果其中某个缓存存 在，直接返回服务器的IP地址。 DNS解析：如果缓存未命中，浏览器向本地 DNS 服务器发起请求，最终可能通过根域名服务器、顶级域名服 务器（.com）、权威域名服务器逐级查询，直到获取目标域名的 IP 地址。…",
    "explanation": "描述一下打开百度首页后发生的网络过程：解析URL：分析 URL 所需要使用的传输协议和请求的资源路径。如果输入的 URL 中的协议或者主机名不合 法，将会把地址栏中输入的内容传递给搜索引擎。如果没有问题，浏览器会检查 URL 中是否出现了非法字 符，则对非法字符进行转义后在进行下一过程。 缓存判断：浏览器缓存 → 系统缓存（hosts 文件） → 路由器缓存 → ISP 的 DNS 缓存，如果其中某个缓存存 在，直接返回服务器的IP地址。 DNS解析：如果缓存未命中，浏览器向本地 DNS 服务器发起请求，最终可能通过根域名服务器、顶级域名服 务器（.com）、权威域名服务器逐级查询，直到获取目标域名的 IP 地址。 获取MAC地址：当浏览器得到 IP 地址后，数据传输还需要知道目的主机 MAC 地址，因为应用层下发数据给 传输层，TCP 协议会指定源端口号和目的端口号，然后下发给网络层。网络层会将本机地址作为源地址，获 取的 IP 地址作为目的地址。…",
    "keyPoints": [
      "能按 URL 解析、缓存与 DNS、路由邻居解析、TCP、TLS、HTTP、代理或 CDN、服务端处理和浏览器加载顺序口述，并指出各阶段可观测信号"
    ],
    "followUps": [
      "能按 URL 解析、缓存与 DNS、路由邻居解析、TCP、TLS、HTTP、代理或 CDN、服务端处理和浏览器加载顺序口述，并指出各阶段可观测信号？"
    ],
    "tags": [
      "计算机网络",
      "浏览器打开网页的完整网络过程"
    ],
    "sourceRef": "网络 PDF p.60-62：打开百度首页后发生的网络过程",
    "source": "builtin",
    "order": 143
  },
  {
    "id": "java-network-d800f3530d",
    "deckId": "java-basics-sample",
    "topic": "计算机网络",
    "importance": "A",
    "score": 7,
    "question": "如何理解CSRF 与 XSS 攻击？",
    "coreAnswer": "CSRF（跨站请求伪造）是一种攻击手段，攻击者通过诱导用户执行恶意操作，从而获取用户数据或执行恶意代 码。CSRF攻击通常通过伪造一个合法的HTTP请求来实现，这个请求看起来是合法的，但实际上是为了执行一个攻 击者控制的操作。 解决CSRF攻击的方法主要有以下几种： 1. 验证用户会话：在服务器端对用户会话进行验证，确保请求的会话标识符与当前会话标识符匹配。这样可以 防止攻击者伪造会话标识符。 2. 使用双重验证：除了会话验证，还可以使用其他验证方式，例如验证码、签名验证等。这些验证方式可以增 加攻击的难度。…",
    "explanation": "CSRF攻击是什么？：CSRF（跨站请求伪造）是一种攻击手段，攻击者通过诱导用户执行恶意操作，从而获取用户数据或执行恶意代 码。CSRF攻击通常通过伪造一个合法的HTTP请求来实现，这个请求看起来是合法的，但实际上是为了执行一个攻 击者控制的操作。 解决CSRF攻击的方法主要有以下几种： 1. 验证用户会话：在服务器端对用户会话进行验证，确保请求的会话标识符与当前会话标识符匹配。这样可以 防止攻击者伪造会话标识符。 2. 使用双重验证：除了会话验证，还可以使用其他验证方式，例如验证码、签名验证等。这些验证方式可以增 加攻击的难度。 3. 防止跨站请求：通过设置CSP（内容安全策略）来防止跨站请求，限制网页中可执行的脚本源，减少攻击者诱 导用户执行恶意操作的可能性。 4. 避免使用自动提交表单：禁用默认的自动提交功能，要求用户在提交表单前确认操作，防止攻击者诱导用户 在未经授权的情况下提交表单。… XSS攻击是什么？：XSS是跨站脚本攻击，攻击者通过在Web页面中插入恶意脚本代码，然后诱使用户访问该页面，从而使得恶意脚本 在用户浏览器中执行，从而盗取用户信息、会话信息等敏感数据，甚至控制用户账户。 XSS 攻击可以分为 3 类：存储型（持久型）、反射型（非持久型）、DOM 型。 存储型 XSS (opens new window)：注入型脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务 器上传回并执行。 反射型 XSS (opens new window)：当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站 时，注入脚本进入被攻击者的网站。Web 服务器将注入脚本，比如一个错误信息，搜索结果等 返回到用户的 浏览器上。由于浏览器认为这个响应来自\"可信任\"的服务器，所以会执行这段脚本。…",
    "keyPoints": [
      " CSRF 借用受害者身份发请求与 XSS 注入脚本执行，分别说明 SameSite、CSRF Token、来源校验以及输出编码、CSP 等主要防线"
    ],
    "followUps": [
      "XSS攻击是什么？"
    ],
    "tags": [
      "计算机网络",
      "CSRF",
      "XSS 攻击",
      "XSS",
      "CSRF 与 XSS 攻击"
    ],
    "sourceRef": "网络 PDF p.67-69：CSRF 攻击是什么；XSS 攻击是什么",
    "source": "builtin",
    "order": 144
  },
  {
    "id": "java-os-277809575a",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "如何理解进程与线程上下文切换？",
    "coreAnswer": "1. 进程切换：进程切换涉及到更多的内容，包括整个进程的地址空间、全局变量、文件描述符等。因此，进程 切换的开销通常比线程切换大。 2. 线程切换：线程切换只涉及到线程的堆栈、寄存器和程序计数器等，不涉及进程级别的资源，因此线程切换 的开销较小。 线程切换的详细过程可以分为以下几个步骤： 上下文保存：当操作系统决定切换到另一个线程时，它首先会保存当前线程的上下文信息。上下文信息包括 寄存器状态、程序计数器、堆栈指针等，用于保存线程的执行状态。 切换到调度器：操作系统将执行权切换到调度器（Scheduler）。调度器负责选择下一个要执行的线程，并根 据调度算法做出决策。…",
    "explanation": "进程切换和线程切换的区别？：1. 进程切换：进程切换涉及到更多的内容，包括整个进程的地址空间、全局变量、文件描述符等。因此，进程 切换的开销通常比线程切换大。 2. 线程切换：线程切换只涉及到线程的堆栈、寄存器和程序计数器等，不涉及进程级别的资源，因此线程切换 的开销较小。 线程切换详细过程是怎么样的？上下文保存在哪里？：线程切换的详细过程可以分为以下几个步骤： 上下文保存：当操作系统决定切换到另一个线程时，它首先会保存当前线程的上下文信息。上下文信息包括 寄存器状态、程序计数器、堆栈指针等，用于保存线程的执行状态。 切换到调度器：操作系统将执行权切换到调度器（Scheduler）。调度器负责选择下一个要执行的线程，并根 据调度算法做出决策。 上下文恢复：调度器选择了下一个要执行的线程后，它会从该线程保存的上下文信息中恢复线程的执行状 态。 切换到新线程：调度器将执行权切换到新线程，使其开始执行。 上下文信息的保存通常由操作系统负责管理，具体保存在哪里取决于操作系统的实现方式。一般情况下，上下文信 息会保存在线程的控制块（Thread Control Block，TCB）中。 TCB是操作系统用于管理线程的数据结构，包含了线程的状态、寄存器的值、堆栈信息等。当发生线程切换时，操 作系统会通过切换TCB来保存和恢复线程的上下文信息。 进程上下文有哪些？：各个进程之间是共享 CPU 资源的，在不同的时候进程之间需要切换，让不同的进程可以在 CPU 执行，那么这个一 个进程切换到另一个进程运行，称为进程的上下文切换。 在详细说进程上下文切换前，我们先来看看 CPU 上下文切换 大多数操作系统都是多任务，通常支持大于 CPU 数量的任务同时运行。实际上，这些任务并不是同时运行的，只 是因为系统在很短的时间内，让各个任务分别在 CPU 运行，于是就造成同时运行的错觉。 任务是交给 CPU 运行的，那么在每个任务运行前，CPU 需要知道任务从哪里加载，又从哪里开始运行。 所以，操作系统需要事先帮 CPU 设置好 CPU 寄存器和程序计数器。 CPU 寄存器是 CPU 内部一个容量小，但是速度极快的内存（缓存）。我举个例子，寄存器像是你的口袋，内存像 你的书包，硬盘则是你家里的柜子，如果你的东西存放到口袋，那肯定是比你从书包或家里柜子取出来要快的多。…",
    "keyPoints": [
      "两者要保存恢复的寄存器、程序计数器、栈指针和调度状态，说明跨进程还涉及地址空间与页表切换及 TLB 影响",
      "不声称文件描述符内容会在每次切换时整体复制"
    ],
    "followUps": [
      "线程切换详细过程是怎么样的？上下文保存在哪里？",
      "进程上下文有哪些？"
    ],
    "tags": [
      "操作系统",
      "进程",
      "线程上下文切换",
      "进程与线程上下文切换"
    ],
    "sourceRef": "操作系统 PDF p.4、p.6-7：进程切换和线程切换的区别；线程切换为什么更快；线程切换过程与上下文保存；进程上下文",
    "source": "builtin",
    "order": 145
  },
  {
    "id": "java-os-0ae308631b",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 6,
    "question": "如何理解进程状态与状态转换？",
    "coreAnswer": "一个完整的进程状态的变迁如下图： 进程五种状态的变迁 再来详细说明一下进程的状态变迁： NULL -> 创建状态：一个新进程被创建时的第一个状态； 创建状态 -> 就绪状态：当进程被创建完成并初始化后，一切就绪准备运行时，变为就绪状态，这个过程是很 快的； 就绪态 -> 运行状态：处于就绪状态的进程被操作系统的进程调度器选中后，就分配给 CPU 正式运行该进程； 运行状态 -> 结束状态：当进程已经运行完成或出错时，会被操作系统作结束状态处理； 运行状态 -> 就绪状态：处于运行状态的进程在运行过程中，由于分配给它的运行时间片用完，操作系统会把 该进程变为就绪态，接着从就绪态选中另外一个进程运行；…",
    "explanation": "进程的状态（五种状态），如何切换？：一个完整的进程状态的变迁如下图： 进程五种状态的变迁 再来详细说明一下进程的状态变迁： NULL -> 创建状态：一个新进程被创建时的第一个状态； 创建状态 -> 就绪状态：当进程被创建完成并初始化后，一切就绪准备运行时，变为就绪状态，这个过程是很 快的； 就绪态 -> 运行状态：处于就绪状态的进程被操作系统的进程调度器选中后，就分配给 CPU 正式运行该进程； 运行状态 -> 结束状态：当进程已经运行完成或出错时，会被操作系统作结束状态处理； 运行状态 -> 就绪状态：处于运行状态的进程在运行过程中，由于分配给它的运行时间片用完，操作系统会把 该进程变为就绪态，接着从就绪态选中另外一个进程运行； 运行状态 -> 阻塞状态：当进程请求某个事件且必须等待时，例如请求 I/O 事件； 阻塞状态 -> 就绪状态：当进程要等待的事件完成时，它从阻塞状态变到就绪状态；",
    "keyPoints": [
      "创建、就绪、运行、阻塞、终止五种状态及合法转换，说明时间片耗尽、等待 I/O、事件完成和退出分别触发什么变化",
      "不混淆阻塞态与就绪态"
    ],
    "followUps": [
      "创建、就绪、运行、阻塞、终止五种状态及合法转换，说明时间片耗尽、等待 I/O、事件完成和退出分别触发什么变化？",
      "不混淆阻塞态与就绪态？"
    ],
    "tags": [
      "操作系统",
      "进程状态",
      "状态转换",
      "进程状态与状态转换"
    ],
    "sourceRef": "操作系统 PDF p.5：进程的五种状态及如何切换",
    "source": "builtin",
    "order": 146
  },
  {
    "id": "java-os-83634f9c4c",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "进程调度算法应该如何理解？",
    "coreAnswer": "先来先服务调度算法 最简单的一个调度算法，就是非抢占式的先来先服务（*First Come First Severd, FCFS*）算法了。 顾名思义，先来后到，每次从就绪队列选择最先进入队列的进程，然后一直运行，直到进程退出或被阻塞，才会继 续从队列中选择第一个进程接着运行。 这似乎很公平，但是当一个长作业先运行了，那么后面的短作业等待的时间就会很长，不利于短作业。 FCFS 对长 作业有利，适用于 CPU 繁忙型作业的系统，而不适用于 I/O 繁忙型作业的系统。…",
    "explanation": "进程调度算法有哪些？：先来先服务调度算法 最简单的一个调度算法，就是非抢占式的先来先服务（*First Come First Severd, FCFS*）算法了。 顾名思义，先来后到，每次从就绪队列选择最先进入队列的进程，然后一直运行，直到进程退出或被阻塞，才会继 续从队列中选择第一个进程接着运行。 这似乎很公平，但是当一个长作业先运行了，那么后面的短作业等待的时间就会很长，不利于短作业。 FCFS 对长 作业有利，适用于 CPU 繁忙型作业的系统，而不适用于 I/O 繁忙型作业的系统。 最短作业优先调度算法 最短作业优先（*Shortest Job First, SJF*）调度算法同样也是顾名思义，它会优先选择运行时间最短的进程来运 行，这有助于提高系统的吞吐量。 这显然对长作业不利，很容易造成一种极端现象。…",
    "keyPoints": [
      "先来先服务、短作业优先、高响应比优先、时间片轮转、最高优先级和多级反馈队列的选择依据、饥饿风险与适用目标，并说明时间片长短的取舍"
    ],
    "followUps": [
      "先来先服务、短作业优先、高响应比优先、时间片轮转、最高优先级和多级反馈队列的选择依据、饥饿风险与适用目标，并说明时间片长短的取舍？"
    ],
    "tags": [
      "操作系统",
      "进程调度算法"
    ],
    "sourceRef": "操作系统 PDF p.11-14：进程调度算法有哪些",
    "source": "builtin",
    "order": 147
  },
  {
    "id": "java-os-35e24a81ff",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "如何理解进程间通信 IPC？",
    "coreAnswer": "Linux 内核提供了不少进程间通信的方式： 管道 消息队列 共享内存 信号 信号量 socket Linux 内核提供了不少进程间通信的方式，其中最简单的方式就是管道，管道分为「匿名管道」和「命名管道」。 匿名管道顾名思义，它没有名字标识，匿名管道是特殊文件只存在于内存，没有存在于文件系统中，shell 命令中 的「|」竖线就是匿名管道，通信的数据是无格式的流并且大小受限，通信的方式是单向的，数据只能在一个方向 上流动，如果要双向通信，需要创建两个管道，再来匿名管道是只能用于存在父子关系的进程间通信，匿名管道的 生命周期随着进程创建而建立，随着进程终止而消失。…",
    "explanation": "进程间通讯有哪些方式？：Linux 内核提供了不少进程间通信的方式： 管道 消息队列 共享内存 信号 信号量 socket Linux 内核提供了不少进程间通信的方式，其中最简单的方式就是管道，管道分为「匿名管道」和「命名管道」。 匿名管道顾名思义，它没有名字标识，匿名管道是特殊文件只存在于内存，没有存在于文件系统中，shell 命令中 的「|」竖线就是匿名管道，通信的数据是无格式的流并且大小受限，通信的方式是单向的，数据只能在一个方向 上流动，如果要双向通信，需要创建两个管道，再来匿名管道是只能用于存在父子关系的进程间通信，匿名管道的 生命周期随着进程创建而建立，随着进程终止而消失。 命名管道突破了匿名管道只能在亲缘关系进程间的通信限制，因为使用命名管道的前提，需要在文件系统创建一个 类型为 p 的设备文件，那么毫无关系的进程就可以通过这个设备文件进行通信。…",
    "keyPoints": [
      "管道、消息队列、共享内存、信号、信号量和 Socket 的数据形态、拷贝开销、同步要求与适用范围",
      "明确共享内存最快但仍需同步，信号用于事件通知"
    ],
    "followUps": [
      "管道、消息队列、共享内存、信号、信号量和 Socket 的数据形态、拷贝开销、同步要求与适用范围？",
      "明确共享内存最快但仍需同步，信号用于事件通知？"
    ],
    "tags": [
      "操作系统",
      "进程间通信 IPC",
      "IPC"
    ],
    "sourceRef": "操作系统 PDF p.7-9：进程间通信有哪些方式",
    "source": "builtin",
    "order": 148
  },
  {
    "id": "java-os-a4d6c8b19d",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "I/O 模型与阻塞边界应该如何理解？",
    "coreAnswer": "阻塞I/O模型：应用程序发起I/O操作后会被阻塞，直到操作完成才返回结果。适用于对实时性要求不高的场 景。 非阻塞I/O模型：应用程序发起I/O操作后立即返回，不会被阻塞，但需要不断轮询或者使用select/poll/epoll 等系统调用来检查I/O操作是否完成。适合于需要进行多路复用的场景，例如需要同时处理多个socket连接的 服务器程序。 I/O复用模型：通过select、poll、epoll等系统调用，应用程序可以同时等待多个I/O操作，当其中任何一个 I/O操作准备就绪时，应用程序会被通知。适合于需要同时处理多个I/O操作的场景，比如高并发的服务端程 序。…",
    "explanation": "你了解过哪些io模型？：阻塞I/O模型：应用程序发起I/O操作后会被阻塞，直到操作完成才返回结果。适用于对实时性要求不高的场 景。 非阻塞I/O模型：应用程序发起I/O操作后立即返回，不会被阻塞，但需要不断轮询或者使用select/poll/epoll 等系统调用来检查I/O操作是否完成。适合于需要进行多路复用的场景，例如需要同时处理多个socket连接的 服务器程序。 I/O复用模型：通过select、poll、epoll等系统调用，应用程序可以同时等待多个I/O操作，当其中任何一个 I/O操作准备就绪时，应用程序会被通知。适合于需要同时处理多个I/O操作的场景，比如高并发的服务端程 序。 信号驱动I/O模型：应用程序发起I/O操作后，可以继续做其他事情，当I/O操作完成时，操作系统会向应用程 序发送信号来通知其完成。适合于需要异步I/O通知的场景，可以提高系统的并发能力。…",
    "keyPoints": [
      "等待数据与拷贝数据两个阶段比较阻塞 I/O、非阻塞 I/O、I/O 多路复用、信号驱动和异步 I/O",
      "准确区分阻塞与非阻塞、同步与异步两个维度"
    ],
    "followUps": [
      "等待数据与拷贝数据两个阶段比较阻塞 I/O、非阻塞 I/O、I/O 多路复用、信号驱动和异步 I/O？",
      "准确区分阻塞与非阻塞、同步与异步两个维度？"
    ],
    "tags": [
      "操作系统",
      "O 模型",
      "阻塞边界",
      "I",
      "O",
      "I/O 模型与阻塞边界"
    ],
    "sourceRef": "操作系统 PDF p.37-38：了解哪些 I/O 模型",
    "source": "builtin",
    "order": 149
  },
  {
    "id": "java-os-88b8cf31f1",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "如何理解多线程收益、代价与线程数量？",
    "coreAnswer": "多线程比单线程的优势：提高程序的运行效率，可以充分利用多核处理器的资源，同时处理多个任务，加快 程序的执行速度。 多线程比单线程的劣势：存在多线程数据竞争访问的问题，需要通过锁机制来保证线程安全，增加了加锁的 开销，并且还会有死锁的风险。多线程会消耗更多系统资源，如CPU和内存，因为每个线程都需要占用一定 的内存和处理时间。 多线程不一定越多越好，过多的线程可能会导致一些问题。 切换开销：线程的创建和切换会消耗系统资源，包括内存和CPU。如果创建太多线程，会占用大量的系统资 源，导致系统负载过高，某个线程崩溃后，可能会导致进程崩溃。 死锁的问题：过多的线程可能会导致竞争条件和死锁。…",
    "explanation": "多线程比单线程的优势，劣势？：多线程比单线程的优势：提高程序的运行效率，可以充分利用多核处理器的资源，同时处理多个任务，加快 程序的执行速度。 多线程比单线程的劣势：存在多线程数据竞争访问的问题，需要通过锁机制来保证线程安全，增加了加锁的 开销，并且还会有死锁的风险。多线程会消耗更多系统资源，如CPU和内存，因为每个线程都需要占用一定 的内存和处理时间。 多线程是不是越多越好，太多会有什么问题？：多线程不一定越多越好，过多的线程可能会导致一些问题。 切换开销：线程的创建和切换会消耗系统资源，包括内存和CPU。如果创建太多线程，会占用大量的系统资 源，导致系统负载过高，某个线程崩溃后，可能会导致进程崩溃。 死锁的问题：过多的线程可能会导致竞争条件和死锁。竞争条件指的是多个线程同时访问和修改共享资源， 如果没有合适的同步机制，可能会导致数据不一致或错误的结果。而死锁则是指多个线程相互等待对方释放 资源，导致程序无法继续执行。",
    "keyPoints": [
      "多核利用、吞吐和响应收益，以及竞争、同步、栈内存、调度切换和故障影响",
      "能按 CPU 密集或 I/O 密集、任务时长和下游容量说明线程数不是越多越好"
    ],
    "followUps": [
      "多线程是不是越多越好，太多会有什么问题？"
    ],
    "tags": [
      "操作系统",
      "多线程收益",
      "代价",
      "线程数量",
      "多线程收益、代价与线程数量"
    ],
    "sourceRef": "操作系统 PDF p.4：多线程比单线程的优劣；线程太多有什么问题",
    "source": "builtin",
    "order": 150
  },
  {
    "id": "java-os-838ac10c8b",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "锁的原理与选型是什么？",
    "coreAnswer": "还有读写锁、自旋锁、条件变量、信号量。 1. 读写锁：读写锁允许多个线程同时读取共享资源，但只允许一个线程进行写操作。适用于读操作频繁、写操 作较少的场景，可以提高并发性能。 2. 自旋锁：自旋锁是一种忙等待锁，线程在获取锁时不会进入阻塞状态，而是循环忙等待直到获取到锁。适用 于临界区很小且锁的持有时间很短的场景，避免线程频繁切换带来的开销。 3. 条件变量：条件变量用于线程间的同步和通信。它通常与互斥锁一起使用，线程可以通过条件变量等待某个 条件满足，当条件满足时，其他线程可以通过条件变量发送信号通知等待线程。 4. 信号量：信号量是一种计数器，用于控制对共享资源的访问。…",
    "explanation": "除了互斥锁你还知道什么锁？分别应用于什么场景？：还有读写锁、自旋锁、条件变量、信号量。 1. 读写锁：读写锁允许多个线程同时读取共享资源，但只允许一个线程进行写操作。适用于读操作频繁、写操 作较少的场景，可以提高并发性能。 2. 自旋锁：自旋锁是一种忙等待锁，线程在获取锁时不会进入阻塞状态，而是循环忙等待直到获取到锁。适用 于临界区很小且锁的持有时间很短的场景，避免线程频繁切换带来的开销。 3. 条件变量：条件变量用于线程间的同步和通信。它通常与互斥锁一起使用，线程可以通过条件变量等待某个 条件满足，当条件满足时，其他线程可以通过条件变量发送信号通知等待线程。 4. 信号量：信号量是一种计数器，用于控制对共享资源的访问。它可以用来限制同时访问资源的线程数量，或 者用于线程间的同步。 为什么并发执行线程要加锁？：并发执行线程需要加锁主要是为了保护共享数据，防止出现\"竞态条件\"。 \"竞态条件\"是指当多个线程同时访问和操作同一块数据时，最终结果依赖于线程的执行顺序，这可能导致数据的不 一致性。 通过加锁，我们可以确保在任何时刻只有一个线程能够访问共享数据，从而避免\"竞态条件\"，确保数据的一致性和 完整性。 自旋锁是什么？应用在哪些场景？：自旋锁加锁失败后，线程会忙等待，直到它拿到锁。 自旋锁是通过 CPU 提供的 CAS 函数（Compare And Swap），在「用户态」完成加锁和解锁操作，不会主动产生 线程上下文切换，所以相比互斥锁来说，会快一些，开销也小一些。 一般加锁的过程，包含两个步骤： 第一步，查看锁的状态，如果锁是空闲的，则执行第二步； 第二步，将锁设置为当前线程持有； CAS 函数就把这两个步骤合并成一条硬件级指令，形成原子指令，这样就保证了这两个步骤是不可分割的，要么一 次性执行完两个步骤，要么两个步骤都不执行。 比如，设锁为变量 lock，整数 0 表示锁是空闲状态，整数 pid 表示线程 ID，那么 CAS(lock, 0, pid) 就表示自旋锁 的加锁操作，CAS(lock, pid, 0) 则表示解锁操作。 使用自旋锁的时候，当发生多线程竞争锁的情况，加锁失败的线程会「忙等待」，直到它拿到锁。… 乐观锁和悲观锁有什么区别？：乐观锁： 基本思想：乐观锁假设多个事务之间很少发生冲突，因此在读取数据时不会加锁，而是在更新数据时检查数 据的版本（如使用版本号或时间戳），如果版本匹配则执行更新操作，否则认为发生了冲突。…",
    "keyPoints": [
      "并发访问共享可变状态为何需要同步，比较互斥锁、读写锁、自旋锁及乐观锁、悲观锁的等待方式、冲突成本和适用场景",
      "不把自旋锁描述成任何临界区都更快"
    ],
    "followUps": [
      "为什么并发执行线程要加锁？",
      "自旋锁是什么？应用在哪些场景？"
    ],
    "tags": [
      "操作系统",
      "锁的原理",
      "选型",
      "锁的原理与选型"
    ],
    "sourceRef": "操作系统 PDF p.11、p.14、p.19：除互斥锁外的锁；为什么加锁；自旋锁；乐观锁和悲观锁",
    "source": "builtin",
    "order": 151
  },
  {
    "id": "java-os-01d181e836",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "如何理解分段、分页与碎片？",
    "coreAnswer": "虚拟地址也可以通过段表与物理地址进行映射的，分段机制会把程序的虚拟地址分成 4 个段，每个段在段表中有一 个项，在这一项找到段的基地址，再加上偏移量，于是就能找到物理内存中的地址，如下图： 如果要访问段 3 中偏移量 500 的虚拟地址，我们可以计算出物理地址为，段 3 基地址 7000 + 偏移量 500 = 7500。",
    "explanation": "讲一下段表？：虚拟地址也可以通过段表与物理地址进行映射的，分段机制会把程序的虚拟地址分成 4 个段，每个段在段表中有一 个项，在这一项找到段的基地址，再加上偏移量，于是就能找到物理内存中的地址，如下图： 如果要访问段 3 中偏移量 500 的虚拟地址，我们可以计算出物理地址为，段 3 基地址 7000 + 偏移量 500 = 7500。",
    "keyPoints": [
      "段的逻辑可变长单位与页的固定大小单位，说明段表、分页机制及段页式组合",
      "外部碎片和页内内部碎片，并说明分页不代表完全没有浪费"
    ],
    "followUps": [
      "段的逻辑可变长单位与页的固定大小单位，说明段表、分页机制及段页式组合？",
      "外部碎片和页内内部碎片，并说明分页不代表完全没有浪费？"
    ],
    "tags": [
      "操作系统",
      "分段",
      "分页",
      "碎片",
      "分段、分页与碎片"
    ],
    "sourceRef": "操作系统 PDF p.24：讲一下段表",
    "source": "builtin",
    "order": 152
  },
  {
    "id": "java-os-006da51a6b",
    "deckId": "java-basics-sample",
    "topic": "操作系统",
    "importance": "A",
    "score": 7,
    "question": "页面置换算法应该如何理解？",
    "coreAnswer": "页面置换算法的功能是，当出现缺页异常，需调入新页面而内存已满时，选择被置换的物理页面，也就是说选择一 个物理页面换出到磁盘，然后把需要访问的页面换入到物理页。 那其算法目标则是，尽可能减少页面的换入换出的次数，常见的页面置换算法有如下几种： 最佳页面置换算法（OPT） 先进先出置换算法（FIFO） 最近最久未使用的置换算法（LRU） 时钟页面置换算法（Lock） 最不常用置换算法（LFU） 最佳页面置换算法 最佳页面置换算法基本思路是，置换在「未来」最长时间不访问的页面。 所以，该算法实现需要计算内存中每个逻辑页面的「下一次」访问时间，然后比较，选择未来最长时间不访问的页 面。…",
    "explanation": "页面置换有哪些算法？：页面置换算法的功能是，当出现缺页异常，需调入新页面而内存已满时，选择被置换的物理页面，也就是说选择一 个物理页面换出到磁盘，然后把需要访问的页面换入到物理页。 那其算法目标则是，尽可能减少页面的换入换出的次数，常见的页面置换算法有如下几种： 最佳页面置换算法（OPT） 先进先出置换算法（FIFO） 最近最久未使用的置换算法（LRU） 时钟页面置换算法（Lock） 最不常用置换算法（LFU） 最佳页面置换算法 最佳页面置换算法基本思路是，置换在「未来」最长时间不访问的页面。 所以，该算法实现需要计算内存中每个逻辑页面的「下一次」访问时间，然后比较，选择未来最长时间不访问的页 面。 我们举个例子，假设一开始有 3 个空闲的物理页，然后有请求的页面序列，那它的置换过程如下图： 在这个请求的页面序列中，缺页共发生了 7 次（空闲页换入 3 次 + 最优页面置换 4 次），页面置换共发生了 4 次。…",
    "keyPoints": [
      " OPT、FIFO、LRU、Clock 和 LFU 的淘汰依据、实现成本与典型问题，知道 OPT 只作理论基准、精确 LRU 代价高，并能根据访问序列计算缺页和置换次数"
    ],
    "followUps": [
      " OPT、FIFO、LRU、Clock 和 LFU 的淘汰依据、实现成本与典型问题，知道 OPT 只作理论基准、精确 LRU 代价高，并能根据访问序列计算缺页和置换次数？"
    ],
    "tags": [
      "操作系统",
      "页面置换算法"
    ],
    "sourceRef": "操作系统 PDF p.32-35：页面置换有哪些算法",
    "source": "builtin",
    "order": 153
  },
  {
    "id": "java-dsa-35edaf3053",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "LRU 缓存与 O(1) 实现应该如何理解？",
    "coreAnswer": "LRU 是一种缓存淘汰算法，当缓存空间已满时，优先淘汰最长时间未被访问的数据。 实现的方式是哈希表+双向链表结合。 具体实现步骤如下： 使用哈希表存储数据的键值对，键为缓存的键，值为对应的节点。 使用双向链表存储数据节点，链表头部为最近访问的节点，链表尾部为最久未访问的节点。 当数据被访问时，如果数据存在于缓存中，则将对应节点移动到链表头部；如果数据不存在于 缓存中，则将数据添加到缓存中，同时创建一个新节点并插入到链表头部。 当缓存空间已满时，需要淘汰最久未访问的节点，即链表尾部的节点。 上面这种思想方式，LRU 算法可以在 O(1) 的时间复杂度内实现数据的插入、查找和删除操作。…",
    "explanation": "LRU是什么？如何实现？：LRU 是一种缓存淘汰算法，当缓存空间已满时，优先淘汰最长时间未被访问的数据。 实现的方式是哈希表+双向链表结合。 具体实现步骤如下： 使用哈希表存储数据的键值对，键为缓存的键，值为对应的节点。 使用双向链表存储数据节点，链表头部为最近访问的节点，链表尾部为最久未访问的节点。 当数据被访问时，如果数据存在于缓存中，则将对应节点移动到链表头部；如果数据不存在于 缓存中，则将数据添加到缓存中，同时创建一个新节点并插入到链表头部。 当缓存空间已满时，需要淘汰最久未访问的节点，即链表尾部的节点。 上面这种思想方式，LRU 算法可以在 O(1) 的时间复杂度内实现数据的插入、查找和删除操作。每 次访问数据时，都会将对应的节点移动到链表头部，保证链表头部的节点是最近访问的数据，而 链表尾部的节点是最久未访问的数据。当缓存空间不足时，淘汰链表尾部的节点即可。",
    "keyPoints": [
      "能用哈希表加双向链表写出 LRU 的 get、put、移动头部和淘汰尾部核心模板，说明为何关键操作是 O(1)",
      "能处理更新已有键和容量淘汰，不要求实现并发缓存"
    ],
    "followUps": [
      "能用哈希表加双向链表写出 LRU 的 get、put、移动头部和淘汰尾部核心模板，说明为何关键操作是 O(1)？",
      "能处理更新已有键和容量淘汰，不要求实现并发缓存？"
    ],
    "tags": [
      "数据结构与算法",
      "LRU 缓存与 O(1) 实现",
      "LRU",
      "O"
    ],
    "sourceRef": "数据结构与算法 PDF p.14-15：LRU 是什么、如何实现",
    "source": "builtin",
    "order": 154
  },
  {
    "id": "java-dsa-b37410d803",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "堆排序与堆化模板应该如何理解？",
    "coreAnswer": "如果每个节点大于等于子树中的每个节点，我们称之为大顶堆，小于等于子树中的每个节点，我 们则称之为小顶堆。 堆的要求： 必须是完全二叉树 堆中的每一个节点，都必须大于等于（或小于等于）其子树中每个节点的值。 堆通常是使用一维数组进行保存，节省空间，不需要存左右子节点的指针，通过下标就可定位左 右节点和父节点。在起始位置为0的数组中： 父节点 i 的左子节点在(2i+1)的位置 父节点 i 的右子节点在(2i+2)的位置 子节点 i 的父节点在(i-1)/2向下取整的位置 我们可以把堆排序的过程大致分为两大步骤，分别是建堆和排序。 建堆：建堆操作就是将一个无序的数组转化为最大堆的操作，首先将数组原地建一个堆。…",
    "explanation": "堆排序算法原理，稳定吗？：如果每个节点大于等于子树中的每个节点，我们称之为大顶堆，小于等于子树中的每个节点，我 们则称之为小顶堆。 堆的要求： 必须是完全二叉树 堆中的每一个节点，都必须大于等于（或小于等于）其子树中每个节点的值。 堆通常是使用一维数组进行保存，节省空间，不需要存左右子节点的指针，通过下标就可定位左 右节点和父节点。在起始位置为0的数组中： 父节点 i 的左子节点在(2i+1)的位置 父节点 i 的右子节点在(2i+2)的位置 子节点 i 的父节点在(i-1)/2向下取整的位置 我们可以把堆排序的过程大致分为两大步骤，分别是建堆和排序。 建堆：建堆操作就是将一个无序的数组转化为最大堆的操作，首先将数组原地建一个堆。“原 地”的含义就是不借助另一个数组，就在原数组上操作。我们的实现思路是从后往前处理数据， 并且每个数据都是从上向下调整。…",
    "keyPoints": [
      "能写自底向上建堆、交换堆顶与末尾、缩小区间并向下堆化的核心模板",
      "建堆 O(n)、整体 O(n log n)、O(1) 额外空间和不稳定性，不要求背逐行代码"
    ],
    "followUps": [
      "能写自底向上建堆、交换堆顶与末尾、缩小区间并向下堆化的核心模板？",
      "建堆 O(n)、整体 O(n log n)、O(1) 额外空间和不稳定性，不要求背逐行代码？"
    ],
    "tags": [
      "数据结构与算法",
      "堆排序",
      "堆化模板",
      "堆排序与堆化模板"
    ],
    "sourceRef": "数据结构与算法 PDF p.21-24：堆排序原理、稳定性、复杂度与代码",
    "source": "builtin",
    "order": 155
  },
  {
    "id": "java-dsa-5f8e175f9c",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "布隆过滤器的数据结构原理应该如何理解？",
    "coreAnswer": "在开发过程中，经常要判断一个元素是否在一个集合中。假设你现在要给项目添加IP黑名单功能，",
    "explanation": "布隆过滤器怎么设计？时间复杂度？：在开发过程中，经常要判断一个元素是否在一个集合中。假设你现在要给项目添加IP黑名单功能，",
    "keyPoints": [
      "位数组加多个哈希函数的添加与查询过程，准确表述“判定不存在则一定不存在，判定存在则可能误判”",
      "能分析 O(k) 操作复杂度和位数组、哈希次数、假阳性率的取舍"
    ],
    "followUps": [
      "位数组加多个哈希函数的添加与查询过程，准确表述“判定不存在则一定不存在，判定存在则可能误判”？",
      "能分析 O(k) 操作复杂度和位数组、哈希次数、假阳性率的取舍？"
    ],
    "tags": [
      "数据结构与算法",
      "布隆过滤器的数据结构原理"
    ],
    "sourceRef": "数据结构与算法 PDF p.15-17：布隆过滤器怎么设计、时间复杂度",
    "source": "builtin",
    "order": 156
  },
  {
    "id": "java-dsa-d8bcec7885",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "如何理解哈希表的冲突、扩容与复杂度？",
    "coreAnswer": "LRU 是一种缓存淘汰算法，当缓存空间已满时，优先淘汰最长时间未被访问的数据。 实现的方式是哈希表+双向链表结合。 具体实现步骤如下： 使用哈希表存储数据的键值对，键为缓存的键，值为对应的节点。 使用双向链表存储数据节点，链表头部为最近访问的节点，链表尾部为最久未访问的节点。 当数据被访问时，如果数据存在于缓存中，则将对应节点移动到链表头部；如果数据不存在于 缓存中，则将数据添加到缓存中，同时创建一个新节点并插入到链表头部。 当缓存空间已满时，需要淘汰最久未访问的节点，即链表尾部的节点。 上面这种思想方式，LRU 算法可以在 O(1) 的时间复杂度内实现数据的插入、查找和删除操作。…",
    "explanation": "LRU是什么？如何实现？：LRU 是一种缓存淘汰算法，当缓存空间已满时，优先淘汰最长时间未被访问的数据。 实现的方式是哈希表+双向链表结合。 具体实现步骤如下： 使用哈希表存储数据的键值对，键为缓存的键，值为对应的节点。 使用双向链表存储数据节点，链表头部为最近访问的节点，链表尾部为最久未访问的节点。 当数据被访问时，如果数据存在于缓存中，则将对应节点移动到链表头部；如果数据不存在于 缓存中，则将数据添加到缓存中，同时创建一个新节点并插入到链表头部。 当缓存空间已满时，需要淘汰最久未访问的节点，即链表尾部的节点。 上面这种思想方式，LRU 算法可以在 O(1) 的时间复杂度内实现数据的插入、查找和删除操作。每 次访问数据时，都会将对应的节点移动到链表头部，保证链表头部的节点是最近访问的数据，而 链表尾部的节点是最久未访问的数据。当缓存空间不足时，淘汰链表尾部的节点即可。 布隆过滤器怎么设计？时间复杂度？：在开发过程中，经常要判断一个元素是否在一个集合中。假设你现在要给项目添加IP黑名单功能，",
    "keyPoints": [
      "哈希函数、桶、冲突处理和负载因子的作用，区分平均 O(1) 与碰撞严重时的退化",
      "扩容为何需要迁移以及均摊复杂度，不要求背具体 JDK 版本的全部阈值"
    ],
    "followUps": [
      "布隆过滤器怎么设计？时间复杂度？"
    ],
    "tags": [
      "数据结构与算法",
      "哈希表的冲突",
      "扩容",
      "复杂度",
      "哈希表的冲突、扩容与复杂度"
    ],
    "sourceRef": "数据结构与算法 PDF p.14-17：LRU 与布隆过滤器使用哈希；Java集合与缓存实现场景补充，原资料未单列哈希表题",
    "source": "builtin",
    "order": 157
  },
  {
    "id": "java-dsa-ba99ac00c4",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "二分查找与边界模板应该如何理解？",
    "coreAnswer": "二分查找适用于有序或答案具有单调性的搜索空间。关键是固定区间定义并保持循环条件、mid 更新和边界收缩一致；查找第一个不小于目标值时，命中后仍向左收缩，最终得到左边界。",
    "explanation": "闭区间模板使用 left <= right，排除 mid 后更新为 mid - 1 或 mid + 1；左闭右开模板使用 left < right，右边界可更新为 mid。无论选择哪一种，都要保证每轮严格缩小区间并检查空数组、单元素、目标不存在和重复值。时间复杂度是 O(log n)，空间复杂度通常是 O(1)。二分答案还需要先证明判断函数随答案单调。",
    "keyPoints": [
      "能在有序数组上分别写“查任意值”“第一个不小于目标值”两种模板，统一闭区间或左闭右开约定，说明 O(log n) 时间与适用前提",
      "能识别答案单调时的二分答案，但不要求背所有变体"
    ],
    "followUps": [
      "如何查找第一个不小于目标值的位置？",
      "二分答案需要满足什么单调性条件？"
    ],
    "tags": [
      "数据结构与算法",
      "二分查找",
      "边界模板",
      "二分查找与边界模板"
    ],
    "sourceRef": "数据结构与算法 PDF p.19：分治与缩小问题规模；校招有序查找边界模板补充，原资料未单列二分题",
    "source": "builtin",
    "order": 158
  },
  {
    "id": "java-dsa-55471cddc6",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 6,
    "question": "如何理解图的表示、BFS 与 DFS？",
    "coreAnswer": "图通常用邻接表或邻接矩阵表示。BFS 借助队列按层扩展，适合无权图最短步数；DFS 借助递归或栈深入搜索，适合连通性判断、路径枚举和回溯。两者都要用 visited 避免重复访问。",
    "explanation": "邻接矩阵占用 O(V²) 空间，判断两点是否相连快，适合稠密图；邻接表占用 O(V+E) 空间，遍历邻居高效，适合稀疏图。BFS 将起点入队并标记，循环取出节点、访问未见邻居并入队。DFS 访问当前节点后递归或压栈处理未见邻居。遍历整张图时还要从每个未访问顶点重新启动，以覆盖非连通分量。",
    "keyPoints": [
      "邻接表与邻接矩阵的空间和遍历代价，写出带 visited 的 BFS、DFS 核心模板，说明 BFS 求无权最短步数、DFS 做连通性或回溯的适用边界",
      "不要求手写全部最短路算法"
    ],
    "followUps": [
      "邻接表和邻接矩阵如何选择？",
      "为什么 BFS 能求无权图最短步数？"
    ],
    "tags": [
      "数据结构与算法",
      "图的表示",
      "BFS",
      "DFS",
      "图的表示、BFS 与 DFS"
    ],
    "sourceRef": "校招算法基础补充（图遍历与连通性场景）：原资料未单列图题",
    "source": "builtin",
    "order": 159
  },
  {
    "id": "java-dsa-9290d42d42",
    "deckId": "java-basics-sample",
    "topic": "数据结构与算法",
    "importance": "A",
    "score": 7,
    "question": "如何理解贪心与动态规划？",
    "coreAnswer": "贪心每一步选择当前看来最优的方案，成立前提是具备贪心选择性质并能证明不会破坏全局最优；动态规划则定义状态、建立转移、设置初值并按依赖顺序计算，用空间换时间消除重复子问题。",
    "explanation": "判断贪心是否可用，不能只看局部策略是否直观，通常要用交换论证或反证法证明。区间选择可按结束时间排序并持续选择不冲突区间。动态规划要先明确状态含义，再写转移方程、初始化和遍历顺序。0/1 背包使用一维数组压缩时，容量必须倒序遍历，避免同一物品在一轮中被重复使用。",
    "keyPoints": [
      "贪心选择性质及用交换论证判断局部最优是否可行，写出按结束时间排序的区间选择模板",
      "能为 DP 定义状态、列转移、设初始化并确定遍历顺序，写出 0/1 背包一维倒序模板，不要求题海"
    ],
    "followUps": [
      "如何证明一个贪心策略正确？",
      "0/1 背包一维优化为什么要倒序遍历？"
    ],
    "tags": [
      "数据结构与算法",
      "贪心",
      "动态规划",
      "贪心与动态规划"
    ],
    "sourceRef": "校招算法基础补充（贪心选择与状态转移模板）：原资料未单列贪心与动态规划题",
    "source": "builtin",
    "order": 160
  },
  {
    "id": "java-mq-8d98cd07c7",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "A",
    "score": 7,
    "question": "如何理解事务消息与最终一致性？",
    "coreAnswer": "一条普通的MQ消息，从产生到被消费，大概流程如下： 1. 生产者产生消息，发送带MQ服务器 2. MQ收到消息后，将消息持久化到存储系统。 3. MQ服务器返回ACk到生产者。 4. MQ服务器把消息push给消费者 5. 消费者消费完消息，响应ACK 6. MQ服务器收到ACK，认为消息消费成功，即在存储中删除消息。 我们举个下订单的例子吧。订单系统创建完订单后，再发送消息给下游系统。如果订单创建成功，然后消息没有成 功发送出去，下游系统就无法感知这个事情，出导致数据不一致。 如何保证数据一致性呢？可以使用事务消息。一起来看下事务消息是如何实现的吧。…",
    "explanation": "如何保证数据一致性，事务消息如何实现？：一条普通的MQ消息，从产生到被消费，大概流程如下： 1. 生产者产生消息，发送带MQ服务器 2. MQ收到消息后，将消息持久化到存储系统。 3. MQ服务器返回ACk到生产者。 4. MQ服务器把消息push给消费者 5. 消费者消费完消息，响应ACK 6. MQ服务器收到ACK，认为消息消费成功，即在存储中删除消息。 我们举个下订单的例子吧。订单系统创建完订单后，再发送消息给下游系统。如果订单创建成功，然后消息没有成 功发送出去，下游系统就无法感知这个事情，出导致数据不一致。 如何保证数据一致性呢？可以使用事务消息。一起来看下事务消息是如何实现的吧。 1. 生产者产生消息，发送一条半事务消息到MQ服务器 2. MQ收到消息后，将消息持久化到存储系统，这条消息的状态是待发送状态。… RocektMQ怎么处理分布式事务？：RocketMQ是一种最终一致性的分布式事务，就是说它保证的是消息最终一致性，而不是像2PC、3PC、TCC那样 强一致分布式事务 假设 A 给 B 转 100块钱，同时它们不是同一个服务上，现在目标是就是 A 减100块钱，B 加100块钱。 实际情况可能有四种： 1）就是A账户减100 （成功），B账户加100 （成功） 2）就是A账户减100（失败），B账户加100 （失败） 3）就是A账户减100（成功），B账户加100 （失败） 4）就是A账户减100 （失败），B账户加100 （成功） 这里 第1和第2 种情况是能够保证事务的一致性的，但是 第3和第4 是无法保证事务的一致性的。 那我们来看下RocketMQ是如何来保证事务的一致性的。 分布式事务的流程如上图： 1、A服务先发送个Half Message（是指暂不能被Consumer消费的消息。…",
    "keyPoints": [
      "业务提交与发消息之间的双写不一致窗口，口述本地消息表或 RocketMQ 半消息、本地事务、提交回滚和事务回查流程",
      "明确事务消息通常保证最终一致，消费端仍需重试、幂等、死信与人工补偿，不等同于端到端强一致"
    ],
    "followUps": [
      "RocektMQ怎么处理分布式事务？"
    ],
    "tags": [
      "消息队列",
      "事务消息",
      "最终一致性",
      "事务消息与最终一致性"
    ],
    "sourceRef": "消息队列 PDF p.4-6、p.10-11：如何保证数据一致性，事务消息如何实现；RocketMQ 怎么处理分布式事务",
    "source": "builtin",
    "order": 161
  },
  {
    "id": "java-mq-262ecc144b",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "A",
    "score": 7,
    "question": "Kafka 核心架构与消费模型应该如何理解？",
    "coreAnswer": "Kafka特点如下： 高吞吐量、低延迟：kafka每秒可以处理几十万条消息，它的延迟最低只有几毫秒，每个topic可以分多个 partition, consumer group 对partition进行consume操作。 可扩展性：kafka集群支持热扩展 持久性、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失 容错性：允许集群中节点失败（若副本数量为n,则允许n-1个节点失败） 高并发：支持数千个客户端同时读写 顺序写入优化：Kafka将消息顺序写入磁盘，减少了磁盘的寻道时间。这种方式比随机写入更高效，因为磁盘 读写头在顺序写入时只需移动一次。…",
    "explanation": "对Kafka有什么了解吗？：Kafka特点如下： 高吞吐量、低延迟：kafka每秒可以处理几十万条消息，它的延迟最低只有几毫秒，每个topic可以分多个 partition, consumer group 对partition进行consume操作。 可扩展性：kafka集群支持热扩展 持久性、可靠性：消息被持久化到本地磁盘，并且支持数据备份防止数据丢失 容错性：允许集群中节点失败（若副本数量为n,则允许n-1个节点失败） 高并发：支持数千个客户端同时读写 Kafka 为什么这么快？：顺序写入优化：Kafka将消息顺序写入磁盘，减少了磁盘的寻道时间。这种方式比随机写入更高效，因为磁盘 读写头在顺序写入时只需移动一次。 批量处理技术：Kafka支持批量发送消息，这意味着生产者在发送消息时可以等待直到有足够的数据积累到一 定量，然后再发送。这种方法减少了网络开销和磁盘I/O操作的次数，从而提高了吞吐量。 零拷贝技术：Kafka使用零拷贝技术，可以直接将数据从磁盘发送到网络套接字，避免了在用户空间和内核空 间之间的多次数据拷贝。这大幅降低了CPU和内存的负载，提高了数据传输效率。 压缩技术：Kafka支持对消息进行压缩，这不仅减少了网络传输的数据量，还提高了整体的吞吐量。 kafka的模型介绍一下，kafka是推送还是拉取？：消费者模型 消息由生产者发送到kafka集群后，会被消费者消费。一般来说我们的消费模型有两种：推送模型(psuh)和拉取模 型(pull)。 推送模型（push） 基于推送模型（push）的消息系统，有消息代理记录消费者的消费状态。 消息代理在将消息推送到消费者后，标记这条消息已经消费，但这种方式无法很好地保证消费被处理。 如果要保证消息被处理，消息代理发送完消息后，要设置状态为“已发送”，只要收到消费者的确认请求后才更 新为“已消费”，这就需要代理中记录所有的消费状态，但显然这种方式不可取。 缺点： push模式很难适应消费速率不同的消费者 因为消息发送速率是由broker决定的，push模式的目标是尽可能以最快速度传递消息，但是这样很容易造成 consumer来不及处理消息，典型的表现就是拒绝服务以及网络拥塞。…",
    "keyPoints": [
      " Broker、Topic、Partition、Replica、Producer、Consumer Group 和 Offset 的关系，解释分区日志追加与消费者组协作",
      " Kafka 由消费者拉取并控制位点，可重放消息，不把“拉取”误解为持续空轮询"
    ],
    "followUps": [
      "Kafka 为什么这么快？",
      "kafka的模型介绍一下，kafka是推送还是拉取？"
    ],
    "tags": [
      "消息队列",
      "Kafka 核心架构",
      "消费模型",
      "Kafka",
      "Kafka 核心架构与消费模型"
    ],
    "sourceRef": "消息队列 PDF p.11-14：对 Kafka 有什么了解；Kafka 模型；Kafka 是推送还是拉取",
    "source": "builtin",
    "order": 162
  },
  {
    "id": "java-mq-f1fb6e9f1f",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "A",
    "score": 7,
    "question": "消息队列选型与 RocketMQ、Kafka 取舍是什么？",
    "coreAnswer": "Kafka、ActiveMQ、RabbitMQ、RocketMQ来进行不同维度对比。 特性 ActiveMQ RabbitMQ RocketMQ 单机吞吐量 万级 万级 10 万级 毫秒级 微秒级 毫秒级 Kafka 10 万级 毫秒级 时效性 可用性 高（主从） 高（主从） 非常高（分布式） 非常高（分布式） 消息重复 至少一次 至少一次 至少一次 最多一次 至少一次最多一次 消息顺序性 有序 支持主题数 千级 消息回溯 不支持 管理界面 普通 有序 百万级 不支持 普通 有序 千级 分区有序 百级，多了性能严重下滑 支持（按时间回溯） 支持（按oﬀset回溯） 完善 普通 选型的时候，我们需要根据业务场景，结合上述特性来进行选型…",
    "explanation": "消息队列怎么选型？：Kafka、ActiveMQ、RabbitMQ、RocketMQ来进行不同维度对比。 特性 ActiveMQ RabbitMQ RocketMQ 单机吞吐量 万级 万级 10 万级 毫秒级 微秒级 毫秒级 Kafka 10 万级 毫秒级 时效性 可用性 高（主从） 高（主从） 非常高（分布式） 非常高（分布式） 消息重复 至少一次 至少一次 至少一次 最多一次 至少一次最多一次 消息顺序性 有序 支持主题数 千级 消息回溯 不支持 管理界面 普通 有序 百万级 不支持 普通 有序 千级 分区有序 百级，多了性能严重下滑 支持（按时间回溯） 支持（按oﬀset回溯） 完善 普通 选型的时候，我们需要根据业务场景，结合上述特性来进行选型。 比如你要支持天猫双十一类超大型的秒杀活动，这种一锤子买卖，那管理界面、消息回溯啥的不重要。 消息队列为什么选择RocketMQ的？：项目用的是 RocketMQ 消息队列。选择RocketMQ的原因是： 开发语言优势。RocketMQ 使用 Java 语言开发，比起使用 Erlang 开发的 RabbitMQ 来说，有着更容易上手 的阅读体验和受众。在遇到 RocketMQ 较为底层的问题时，大部分熟悉 Java 的同学都可以深入阅读其源码， 分析、排查问题。 社区氛围活跃。RocketMQ 是阿里巴巴开源且内部在大量使用的消息队列，说明 RocketMQ 是的确经得起残 酷的生产环境考验的，并且能够针对线上环境复杂的需求场景提供相应的解决方案。 特性丰富。根据 RocketMQ 官方文档的列举，其高级特性达到了 12 种 ，例如顺序消息、事务消息、消息过 滤、定时消息等。顺序消息、事务消息、消息过滤、定时消息。RocketMQ 丰富的特性，能够为我们在复杂 的业务场景下尽可能多地提供思路及解决方案。 RocketMQ和Kafka的区别是什么？如何做技术选型？：Kafka的优缺点： 优点：首先，Kafka的最大优势就在于它的高吞吐量，在普通机器4CPU8G的配置下，一台机器可以抗住十几 万的QPS，这一点还是相当优越的。Kafka支持集群部署，如果部分机器宕机不可用，则不影响Kafka的正常 使用。 缺点：Kafka有可能会造成数据丢失，因为它在收到消息的时候，并不是直接写到物理磁盘的，而是先写入到 磁盘缓冲区里面的。Kafka功能比较的单一 主要的就是支持收发消息，高级功能基本没有，就会造成适用场景 受限。…",
    "keyPoints": [
      "吞吐与延迟、消息模型、顺序与事务、消费重试、运维生态、语言团队和已有基础设施比较方案",
      " RocketMQ 与 Kafka 的典型侧重，并用业务约束作选择，不只按流行度或开发语言下结论"
    ],
    "followUps": [
      "消息队列为什么选择RocketMQ的？",
      "RocketMQ和Kafka的区别是什么？如何做技术选型？"
    ],
    "tags": [
      "消息队列",
      "消息队列选型与 RocketMQ",
      "Kafka 取舍",
      "RocketMQ",
      "Kafka",
      "消息队列选型与 RocketMQ、Kafka 取舍"
    ],
    "sourceRef": "消息队列 PDF p.1、p.9：消息队列怎么选型；为什么选择 RocketMQ；RocketMQ 和 Kafka 的区别与选型",
    "source": "builtin",
    "order": 163
  },
  {
    "id": "java-mq-0e0cee5e70",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "A",
    "score": 7,
    "question": "消息队列架构设计应该如何理解？",
    "coreAnswer": "这个问题面试官主要考察三个方面的知识点： 你有没有对消息队列的架构原理比较了解 考察你的个人设计能力 考察编程思想，如什么高可用、可扩展性、幂等等等。 遇到这种设计题，大部分人会很蒙圈，因为平时没有思考过类似的问题。大多数人平时埋头增删改啥，不去思考框 架背后的一些原理。有很多类似的问题，比如让你来设计一个 Dubbo 框架，或者让你来设计一个MyBatis 框架，",
    "explanation": "让你写一个消息队列，该如何进行架构设计？：这个问题面试官主要考察三个方面的知识点： 你有没有对消息队列的架构原理比较了解 考察你的个人设计能力 考察编程思想，如什么高可用、可扩展性、幂等等等。 遇到这种设计题，大部分人会很蒙圈，因为平时没有思考过类似的问题。大多数人平时埋头增删改啥，不去思考框 架背后的一些原理。有很多类似的问题，比如让你来设计一个 Dubbo 框架，或者让你来设计一个MyBatis 框架，",
    "keyPoints": [
      " Producer、Broker、存储、Consumer 和确认协议画出主链路，覆盖 RPC 与序列化、消息标识、持久化与副本、分区路由、消费位点、重试死信、监控和水平扩容",
      "每项设计解决的失败场景"
    ],
    "followUps": [
      " Producer、Broker、存储、Consumer 和确认协议画出主链路，覆盖 RPC 与序列化、消息标识、持久化与副本、分区路由、消费位点、重试死信、监控和水平扩容？",
      "每项设计解决的失败场景？"
    ],
    "tags": [
      "消息队列",
      "消息队列架构设计"
    ],
    "sourceRef": "消息队列 PDF p.8-9：让你写一个消息队列，如何进行架构设计",
    "source": "builtin",
    "order": 164
  },
  {
    "id": "java-mq-a65c02c0af",
    "deckId": "java-basics-sample",
    "topic": "消息队列",
    "importance": "A",
    "score": 7,
    "question": "如何理解Kafka 分区与消费者组分配？",
    "coreAnswer": "Kafka 消息积压是一个常见的问题，它可能会导致数据处理延迟，甚至影响业务的正常运行，下面是一些解决 Kafka 消息积压问题的常用方法： 增加消费者实例可以提高消息的消费速度，从而缓解积压问题。你需要确保消费者组中的消费者数量不超过 分区数量，因为一个分区同一时间只能被一个消费者消费。 增加 Kafka 主题的分区数量可以提高消息的并行处理能力。在创建新分区后，你需要重新平衡消费者组，让 更多的消费者可以同时消费消息。…",
    "explanation": "kafka 消息积压怎么办？：Kafka 消息积压是一个常见的问题，它可能会导致数据处理延迟，甚至影响业务的正常运行，下面是一些解决 Kafka 消息积压问题的常用方法： 增加消费者实例可以提高消息的消费速度，从而缓解积压问题。你需要确保消费者组中的消费者数量不超过 分区数量，因为一个分区同一时间只能被一个消费者消费。 增加 Kafka 主题的分区数量可以提高消息的并行处理能力。在创建新分区后，你需要重新平衡消费者组，让 更多的消费者可以同时消费消息。 费线程数和分区数的关系是怎么样的？：topic下的一个分区只能被同一个consumer group下的一个consumer线程来消费，但反之并不成立，即一个 consumer线程可以消费多个分区的数据，比如Kafka提供的ConsoleConsumer，默认就只是一个线程来消费所有 分区的数据。 所以，分区数决定了同组消费者个数的上限。 如果你的分区数是N，那么最好线程数也保持为N，这样通常能够达到最大的吞吐量。超过N的配置只是浪费系统资 源，因为多出的线程不会被分配到任何分区。",
    "keyPoints": [
      "同一消费组内一个分区同一时刻只交给一个消费者、一个消费者可负责多个分区，不同消费组可独立读取",
      "分区数限定组内有效并行度，并能分析消费者数少于、等于或多于分区数的结果"
    ],
    "followUps": [
      "费线程数和分区数的关系是怎么样的？"
    ],
    "tags": [
      "消息队列",
      "Kafka 分区",
      "消费者组分配",
      "Kafka",
      "Kafka 分区与消费者组分配"
    ],
    "sourceRef": "消息队列 PDF p.14-15：为什么一个分区只能由消费组的一个消费者消费；10 个分区时消费线程数与分区数关系",
    "source": "builtin",
    "order": 165
  }
]
