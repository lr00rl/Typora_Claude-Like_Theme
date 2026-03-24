# Claude-Like Theme

[English README](README_en.md)

![Light Preview](image/light.png)

![Dark Preview](image/dark.png)

![Outline Preview](image/outline.png)

一个以 Claude-like 阅读体验为灵感、针对中文写作与技术文档重新打磨的 Typora 主题。

## 主题概览

这个主题不是简单复刻网页视觉，而是把更安静、克制、适合长时间阅读的文档气质带进 Typora，并继续围绕中文排版、代码块、表格、侧边栏和导出效果做针对性优化。

当前仓库包含：

- `claude-like.css`：浅色主题
- `claude-like-dark.css`：深色主题
- `tests/typora-theme-workspace`：用于验证文件树、大纲、Markdown 和 sidenote 的演示工作区

## 最近能力整理

结合当前 CSS 和最近的 `git log`，这套主题现在重点覆盖了这些能力：

- 文件树 tree hint line，包含竖向 stem、横向连接线和最后一个节点的圆角收尾
- File Library 中 active file 吸顶，以及 ancestor breadcrumb 逐层吸顶
- sticky depth support 扩展到 10 层目录
- Outline 侧边栏的树状提示线与 hover / active 高亮
- 更宽的正文区域与图片比例保护
- 任务列表已完成状态的弱化处理
- Tufte 风格 sidenote，以及与 `typora-plugin-lite` 的 `sidenote` 插件联动的编辑器样式

## 安装

也可以直接从 GitHub Releases 下载最新主题文件。

1. 打开 Typora。
2. 进入 `设置 / 偏好设置 -> 外观 -> 打开主题文件夹`。
3. 将下列文件复制到主题目录：
   - `claude-like.css`
   - `claude-like-dark.css`
4. 重启 Typora。
5. 在主题菜单中选择：
   - `Claude-like`
   - `Claude-like Dark`

> Windows 推荐将 `偏好设置 -> 外观 -> 窗口样式` 设为 `一体化`，重启后生效。当前主题在 Windows 一体化模式下更稳定。

## 设计重点

- 中文正文优先：正文、标题、强调文本、代码分别使用不同字体策略
- 长文阅读优先：低饱和、轻对比、较宽松留白，不抢正文注意力
- 技术文档优先：表格、代码块、行内代码、数学公式与导出效果统一
- 双主题同步维护：浅色和深色不是简单反色，而是分别调过对比度、边框强度和代码高亮

## 视觉特性

### 1. 文件树与大纲

- 左侧 File Library 有树状连接线
- 当前活动文件有更明确的高亮与左侧强调条
- 活动文件的祖先目录会在滚动时逐层吸顶
- 右侧 Outline 也有对应的树状提示线和拐点处理

![Outline Preview](image/outline.png)

### 2. 正文与 Markdown

- 中文正文和中英混排更稳
- 标题层级更清楚
- 引用块、分隔线、列表与任务列表保持统一气质
- `TOC` 区块有独立容器样式

### 3. 表格与代码

- 表格边框、行间距、数字对齐和 hover 状态已统一
- 行内代码使用胶囊式弱强调
- 代码块有独立背景、边框、语言标签和语法高亮
- 如果在 Typora 中开启代码块行号，主题也会同步覆盖行号颜色

### 4. Sidenote

主题内置了 Tufte 风格 sidenote 规则，适合做术语补充、注释和边栏说明。

最简单的写法：

```html
这里是正文<span class="sidenote">这是一条旁注。</span>正文继续。
```

如果希望在 Typora 编辑器内也看到完整的 sidenote 编号和边栏效果，推荐配合 [typora-plugin-lite](https://github.com/lr00rl/typora-plugin-lite) 的 `sidenote` 插件。主题 CSS 负责视觉样式，插件负责把编辑器里的 inline HTML 标记转换为可供 CSS 识别的 class。

宽屏示例：

![Sidenote Wide Preview](image/sidenote-example-wide.png)

窄屏示例：

![Sidenote Narrow Preview](image/sidenote-example-narrow.png)

## 演示工作区

仓库内新增了一套专门给 Typora 使用的测试工作区：

- 根目录：`tests/typora-theme-workspace`
- 主测试文件：`tests/typora-theme-workspace/01-library-lab/02-ancestor-breadcrumb/01-outline-lab/02-markdown-lab/03-code-lab/04-sidenote-lab/05-export-lab/06-depth-lab/07-tree-line-lab/08-sticky-lab/09-active-file-lab/10-showcase/typora-theme-showcase.md`

建议这样测试：

1. 在 Typora 中直接打开 `tests/typora-theme-workspace` 整个文件夹。
2. 保持左侧 File Library 和右侧 Outline 同时打开。
3. 打开最深层的 `typora-theme-showcase.md`。
4. 滚动左侧文件树，检查 tree hint line、sticky ancestor breadcrumb、sticky active file。
5. 在正文里检查标题层级、TOC、表格、代码块、代码行号、数学公式、图片、脚注和 sidenote。
6. 在 `Claude-like` 与 `Claude-like Dark` 之间切换，并把窗口宽度切到 `>=1200px` 和 `<1200px` 两种状态对比旁注表现。

## 适用场景

- 长篇 Markdown 文档
- AI 对话整理与二次编辑
- 面向中文读者的技术笔记
- 带有大量代码块和表格的说明文档
- 需要导出 PDF 且希望版式稳定的内容

## 文件说明

- `claude-like.css`：浅色主题
- `claude-like-dark.css`：深色主题
- `README.md`：中文说明
- `README_en.md`：英文说明
- `tests/typora-theme-workspace`：演示工作区

## 总结

如果你想要的不是“网页截图风”的 Typora 主题，而是一套更安静、可信、适合长期阅读与写作的中文 Markdown 主题，这个主题会更合适。它现在已经把文件树、大纲提示线、深层 sticky、代码块、表格和 sidenote 这些实际使用频率很高的部分一起收拢到了同一套视觉逻辑里。
