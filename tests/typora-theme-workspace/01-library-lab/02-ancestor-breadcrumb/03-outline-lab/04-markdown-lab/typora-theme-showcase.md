---
title: Typora Theme Showcase
theme: Claude-like
tags:
  - typora
  - theme
  - showcase
---

# Typora 主题综合测试页

这是一份尽可能覆盖 `Claude-like` 主题视觉特性的主测试文件。为了同时观察左侧文件树 tree hint line 与右侧大纲提示线，请在 Typora 中以 `tests/typora-theme-workspace` 作为根目录打开整个文件夹，再打开当前文件。

- 左侧验证重点：tree hint line、sticky ancestor breadcrumb、sticky active file、active row 高亮
- 右侧验证重点：Outline 连接线、不同层级标题的拐点、hover / active 状态
- 正文验证重点：中英文排版、列表、表格、引用、代码块、行内代码、代码行号、数学公式、图片、TOC、sidenote
- 建议补充操作：切换 `Claude-like` / `Claude-like Dark`，以及在宽屏和窄屏之间切换窗口宽度

> 如果要验证代码行号样式，请先在 Typora 的代码块设置中开启行号显示。

[TOC]

---

## 1. 目录与标题层级

这一节专门用来让右侧大纲有足够明显的层级变化，便于观察大纲提示线的竖线、L 型转角、首尾节点处理，以及当前条目的高亮表现。

### 1.1 三级标题

正文里混排一点中文与 English text，用来观察 serif 正文字体、字重、数字和标点在连续阅读下的节奏是否稳定。

#### 1.1.1 四级标题

再下一层标题用于触发更深的大纲节点。

##### 1.1.1.1 五级标题

这个层级主要用来确认小字号标题在当前主题里不会挤成一团。

###### 1.1.1.1.1 六级标题

六级标题通常最容易看起来像普通正文，这里可以检查弱层级标题的区分度。

### 1.2 同级分支

右侧大纲不只需要一条深链，也需要兄弟分支，所以这里再放一组同级节点。

#### 1.2.1 同级分支下的子节点

大纲里应该能看到更自然的分叉结构，而不是只有单向缩进。

#### 1.2.2 另一条子节点

继续保留一段普通文本，观察 active item 在滚动过程中是否仍清晰。

---

## 2. 正文与行内语法

这一段用于观察正文的基础阅读气质：`inline code`、**粗体**、*斜体*、***粗斜体***、~~删除线~~、[外部链接](https://typora.io/)、以及中英混排中的 `functionName()`、`--accent-color`、`README_en.md`。

你也可以顺便看一下以下行内元素：

- HTML 上标：E = mc<sup>2</sup>
- HTML 下标：H<sub>2</sub>O
- 行内代码胶囊：`pnpm dev`
- 混合数字：版本 `v1.1.1`、深度 `10`、色值 `#bc6a3a`

### 2.1 无序列表

- 一级列表项
- 另一个一级列表项，里面带有 `inline code`
  - 二级列表项
  - 二级列表项，观察 marker 颜色
- 最后一个一级列表项

### 2.2 有序列表

1. 第一步，观察编号与正文的距离。
2. 第二步，看看嵌套列表是否仍然整齐。
3. 第三步，确认中文段落在列表中不会拥挤。

### 2.3 任务列表

- [x] 已完成的任务，应该有更柔和的颜色和删除线
- [x] 再来一项已完成任务，观察 checked state 是否统一
- [ ] 未完成任务，观察 hover 时的 checkbox 放大效果
- [ ] 最后一项未完成任务

---

## 3. 引用、分隔线与补充说明

> 这是一段一级引用，用来观察引用块的背景、左边框、圆角和正文颜色。
>
> > 这是一段嵌套引用，用来确认内层引用仍然保持可读，而不会塌成一片。
>
> 最后一段文字用来测试多段 blockquote 的间距。

上面是引用块，下面是分隔线：

---

分隔线之后再接正文，确认上下留白过渡自然。

---

## 4. 表格系统

下表同时覆盖了对齐、数字、强调文本、混合中英文和 hover 行背景。

| 项目 | Light | Dark | 备注 |
| :-- | :--: | --: | :-- |
| 正文排版 | Calm | Calm | **中文正文**偏克制，适合长文 |
| 文件树 | Yes | Yes | 含 tree hint line 与 active row 左侧强调条 |
| 大纲提示线 | Yes | Yes | 多级标题越丰富越容易观察 |
| 代码块 | 8px radius | 8px radius | 含语法高亮、语言标签、可选行号 |
| Sidenote | Responsive | Responsive | 宽屏浮右，窄屏回流行内 |

### 4.1 参数对照

| Token | Value | Meaning |
| :-- | --: | :-- |
| `--accent-color` | `#bc6a3a` | 主题强调色 |
| `--bg-color` | `#faf9f5` | 浅色正文背景 |
| `--code-bg-color` | `#fcfcfa` | 代码块背景 |
| `depth-support` | `10` | sticky depth support |

---

## 5. 代码块与代码行号

下面几段代码用来覆盖关键词、字符串、数字、注释、标签、属性、变量名，以及代码块语言标签。

### 5.1 TypeScript

```ts
type ThemeFeature = {
  name: string;
  depth: number;
  enabled: boolean;
};

const features: ThemeFeature[] = [
  { name: "tree-lines", depth: 10, enabled: true },
  { name: "outline-lines", depth: 6, enabled: true },
  { name: "sidenote", depth: 2, enabled: true },
];

function summarizeTheme(themeName: string): string {
  const active = features.filter((item) => item.enabled).length;
  return `${themeName} keeps ${active} polished UI details in sync.`;
}

console.log(summarizeTheme("Claude-like"));
```

### 5.2 HTML

```html
<section class="theme-demo" data-mode="light">
  <h2>Tree Hint Line</h2>
  <p>
    Body text
    <span class="sidenote">A margin note rendered by the theme.</span>
  </p>
</section>
```

### 5.3 CSS

```css
:root {
  --accent-color: #bc6a3a;
  --border-color: #ddd5ca;
}

.outline-item-active::before {
  width: 7px !important;
}

#file-library-tree .file-tree-node.active {
  position: sticky;
  top: 0;
}
```

### 5.4 Bash

```bash
git log --oneline --decorate -n 10
rg -n "sidenote|outline|file-tree" claude-like.css
```

---

## 6. 数学公式

行内公式示例：$f(x)=x^2 + 2x + 1$，用于观察正文中的 math baseline 是否自然。

块级公式示例：

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

再来一组常见的矩阵公式：

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\
0 & 1 & 4 \\
0 & 0 & 1
\end{bmatrix}
$$

---

## 7. 图片与链接

下面三张图分别用来确认浅色、深色与 sidenote 相关截图在当前主题中的尺寸、圆角与排版节奏是否稳定。

![Light Theme Preview](https://raw.githubusercontent.com/lr00rl/Typora_Claude-Like_Theme/master/image/light.png)

![Dark Theme Preview](https://raw.githubusercontent.com/lr00rl/Typora_Claude-Like_Theme/master/image/dark.png)

![Sidenote Preview](https://raw.githubusercontent.com/lr00rl/Typora_Claude-Like_Theme/master/image/sidenote-example-wide.png)

更多信息可以查看 [Typora 官方网站](https://typora.io/) 或仓库里的 `README.md` / `README_en.md`。

---

## 8. 脚注

脚注适合观察正文和附注区域的默认 Typora 呈现是否与主题主体风格协调。这里先放两个引用点[^theme]，再放第二个[^plugin]。

[^theme]: 当前主题同时维护浅色与深色版本，并对表格、代码块、侧边栏和旁注做了统一调校。
[^plugin]: 如果希望在 Typora 编辑器中看到 sidenote 的完整行为，需要配合 `typora-plugin-lite` 的 `sidenote` 插件。

---

## 9. Sidenote 样式

这一节是主题特性验证的重点。建议你分别在宽屏和窄屏下观察。

### 9.1 插件友好的简写方式

这里是一段正文<span class="sidenote">如果你安装了 `typora-plugin-lite` 的 `sidenote` 插件，这段旁注会在编辑器里被识别为可样式化的 sidenote；在导出 HTML / PDF 时，它也会按主题规则浮到右侧。</span>正文继续。

### 9.2 完整 Tufte toggle 结构

这里是一段带完整 toggle 结构的正文<label for="sn-demo-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-demo-1" class="margin-toggle" /><span class="sidenote">这一条可以验证编号、桌面端右侧浮动，以及窄屏下的 toggle 行为。</span>继续正文。

### 9.3 用代码块展示写法

```html
这里是正文<span class="sidenote">这是一个插件友好的旁注。</span>正文继续。

这里是正文
<label for="sn-demo-2" class="margin-toggle sidenote-number"></label>
<input type="checkbox" id="sn-demo-2" class="margin-toggle" />
<span class="sidenote">这是完整的 Tufte sidenote 结构。</span>
正文继续。
```

---

## 10. 最终检查清单

- [ ] 左侧文件树已显示 tree hint line
- [ ] 左侧文件树滚动时出现 sticky ancestor breadcrumb
- [ ] 当前活动文件在左侧保持 sticky active file
- [ ] 右侧大纲已显示多级提示线和拐点
- [ ] `TOC` 区块样式正常
- [ ] 表格 hover、边框和数字对齐正常
- [ ] 代码块语法高亮和语言标签正常
- [ ] 如果开启了行号，代码编号颜色与边距正常
- [ ] sidenote 在宽屏下浮到右侧，在窄屏下回流
- [ ] 浅色与深色主题切换后没有明显断层
