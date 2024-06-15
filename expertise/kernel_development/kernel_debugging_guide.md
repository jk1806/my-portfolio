# Kernel Debugging Guide

## Overview
Comprehensive guide to Linux kernel debugging techniques and tools.

## Debugging Techniques

### printk and Logging
- printk levels (KERN_EMERG to KERN_DEBUG)
- Dynamic debug framework
- pr_* macros (pr_info, pr_err, pr_debug)
- dev_* macros for device drivers
- Log buffer management

### Kernel Oops Analysis
- Understanding oops messages
- Stack trace interpretation
- Register dump analysis
- Symbol resolution
- Address-to-symbol conversion

### Core Dumps and Crash Analysis
- Kernel crash dumps
- vmcore analysis
- Crash utility usage
- GDB for kernel debugging
- Remote debugging setup

### Profiling and Performance
- ftrace framework
- perf tool usage
- kprobes and uprobes
- SystemTap
- eBPF for tracing

### Memory Debugging
- KASAN (Kernel Address Sanitizer)
- KMSAN (Kernel Memory Sanitizer)
- UBSAN (Undefined Behavior Sanitizer)
- kmemleak for memory leaks
- Page allocator debugging

### Lock Debugging
- Lockdep for deadlock detection
- Lock statistics
- Spinlock debugging
- Mutex debugging

## Tools
- GDB
- KGDB
- ftrace
- perf
- SystemTap
- KASAN
- Crash utility

