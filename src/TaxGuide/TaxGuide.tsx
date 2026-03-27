import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG = "#0B1929";
const TEXT_PRIMARY = "#F0F4FF";
const TEXT_SECONDARY = "#8B9BB4";
const ACCENT = "#F0B429";
const FONT = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';

const TRANSITION_FRAMES = 15;

// ─── Shared helpers ───────────────────────────────────────────────────────────

const useSceneFade = (durationInFrames: number) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [0, TRANSITION_FRAMES, durationInFrames - TRANSITION_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

const useSpringIn = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 200 } });
};

// Label that animates in with a spring
const SpringLabel: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const s = useSpringIn(delay);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Scene wrappers ───────────────────────────────────────────────────────────

const SceneWrap: React.FC<{
  durationInFrames: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ durationInFrames, children, style }) => {
  const opacity = useSceneFade(durationInFrames);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        opacity,
        padding: "80px 120px",
        fontFamily: FONT,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ─── Scene 1: Title ───────────────────────────────────────────────────────────
const SCENE_1_FRAMES = 150;

const Scene1Title: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_1_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          小企业税务筹划实务指南
        </SpringLabel>
        <SpringLabel
          delay={8}
          style={{
            fontSize: 36,
            color: ACCENT,
            textAlign: "center",
            letterSpacing: 4,
          }}
        >
          加拿大 · 魁北克
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 2: Section 1 header ────────────────────────────────────────────────
const SCENE_2_FRAMES = 120;

const Scene2SectionHeader: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_2_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <SpringLabel
          delay={0}
          style={{ fontSize: 28, color: ACCENT, fontWeight: 600 }}
        >
          一
        </SpringLabel>
        <SpringLabel
          delay={5}
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            lineHeight: 1.4,
          }}
        >
          先回答最根本的问题
        </SpringLabel>
        <SpringLabel
          delay={12}
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: ACCENT,
            lineHeight: 1.3,
          }}
        >
          你需要一家公司吗？
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 3: Common misconception ───────────────────────────────────────────
const SCENE_3_FRAMES = 150;

const Scene3Misconception: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_3_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <SpringLabel
          delay={0}
          style={{ fontSize: 32, color: TEXT_SECONDARY }}
        >
          很多人在创业初期就急于注册公司
        </SpringLabel>
        <SpringLabel
          delay={8}
          style={{ fontSize: 32, color: TEXT_SECONDARY }}
        >
          认为"有公司才专业"，或听说"公司税率低"……
        </SpringLabel>
        <SpringLabel
          delay={16}
          style={{
            marginTop: 16,
            fontSize: 48,
            fontWeight: 800,
            color: ACCENT,
            lineHeight: 1.4,
          }}
        >
          这是一个代价不低的误区
        </SpringLabel>
        <SpringLabel
          delay={24}
          style={{ fontSize: 28, color: TEXT_SECONDARY, maxWidth: 900 }}
        >
          公司的税务优势并非自动生效——它只在特定条件下才有意义
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 4: Core logic question ────────────────────────────────────────────
const SCENE_4_FRAMES = 150;

const Scene4CoreLogic: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_4_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 28,
            color: TEXT_SECONDARY,
            textAlign: "center",
          }}
        >
          判断的核心只有一条逻辑：
        </SpringLabel>
        <SpringLabel
          delay={10}
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            textAlign: "center",
            lineHeight: 1.5,
            maxWidth: 960,
            padding: "32px 40px",
            borderLeft: `6px solid ${ACCENT}`,
            backgroundColor: "rgba(240,180,41,0.07)",
            borderRadius: 12,
          }}
        >
          你的收入，有没有一部分是你现在不需要花掉的？
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 5: Low income case ─────────────────────────────────────────────────
const SCENE_5_FRAMES = 150;

const Scene5LowIncome: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_5_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 36,
            color: TEXT_SECONDARY,
          }}
        >
          如果年净利润在
        </SpringLabel>
        <SpringLabel
          delay={6}
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: TEXT_PRIMARY,
          }}
        >
          6–7 万以下
        </SpringLabel>
        <SpringLabel
          delay={12}
          style={{ fontSize: 32, color: TEXT_SECONDARY }}
        >
          且这些钱全部用于日常生活……
        </SpringLabel>
        <SpringLabel
          delay={20}
          style={{
            marginTop: 16,
            fontSize: 44,
            fontWeight: 700,
            color: ACCENT,
            lineHeight: 1.4,
          }}
        >
          设立公司几乎没有税务意义
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 6: Tax rate comparison ─────────────────────────────────────────────
const SCENE_6_FRAMES = 180;

const TaxBar: React.FC<{
  label: string;
  rate: string;
  barColor: string;
  maxWidth: number;
  delay: number;
}> = ({ label, rate, barColor, maxWidth, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const barW = interpolate(progress, [0, 1], [0, maxWidth]);

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 28,
          color: TEXT_SECONDARY,
          marginBottom: 10,
          opacity: progress,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: barW,
            height: 52,
            backgroundColor: barColor,
            borderRadius: 8,
          }}
        />
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: barColor,
            opacity: progress,
          }}
        >
          {rate}
        </div>
      </div>
    </div>
  );
};

const Scene6TaxComparison: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_6_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            marginBottom: 40,
          }}
        >
          税率差异对比
        </SpringLabel>
        <TaxBar
          label="公司层面（小企业税率）"
          rate="12% – 15%"
          barColor="#4ADE80"
          maxWidth={340}
          delay={8}
        />
        <TaxBar
          label="个人税率（魁北克）"
          rate="40%+"
          barColor="#F87171"
          maxWidth={760}
          delay={18}
        />
        <SpringLabel
          delay={36}
          style={{
            marginTop: 24,
            fontSize: 28,
            color: TEXT_SECONDARY,
            maxWidth: 860,
            lineHeight: 1.6,
          }}
        >
          如果你把公司里的钱全部取出来用，这个差异就彻底消失了
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 7: High income case ────────────────────────────────────────────────
const SCENE_7_FRAMES = 150;

const Scene7HighIncome: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_7_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <SpringLabel
          delay={0}
          style={{ fontSize: 36, color: TEXT_SECONDARY }}
        >
          反过来说，如果年净利润
        </SpringLabel>
        <SpringLabel
          delay={6}
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: TEXT_PRIMARY,
          }}
        >
          8–10 万以上
        </SpringLabel>
        <SpringLabel
          delay={12}
          style={{ fontSize: 32, color: TEXT_SECONDARY }}
        >
          且其中有一部分暂时不需要动用……
        </SpringLabel>
        <SpringLabel
          delay={20}
          style={{
            marginTop: 16,
            fontSize: 40,
            fontWeight: 700,
            color: ACCENT,
            lineHeight: 1.4,
          }}
        >
          公司结构开始真正发挥作用
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 8: Tax deferral ────────────────────────────────────────────────────
const SCENE_8_FRAMES = 150;

const Scene8TaxDeferral: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_8_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: ACCENT,
            textAlign: "center",
            letterSpacing: 8,
          }}
        >
          递延纳税
        </SpringLabel>
        <SpringLabel
          delay={10}
          style={{
            fontSize: 30,
            color: TEXT_SECONDARY,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.7,
          }}
        >
          让钱先以{" "}
          <span style={{ color: "#4ADE80", fontWeight: 700 }}>12%</span>{" "}
          的税率留在公司
        </SpringLabel>
        <SpringLabel
          delay={18}
          style={{
            fontSize: 30,
            color: TEXT_SECONDARY,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.7,
          }}
        >
          等到需要时再提取，而不是现在就以{" "}
          <span style={{ color: "#F87171", fontWeight: 700 }}>40%</span>{" "}
          缴给政府
        </SpringLabel>
        <SpringLabel
          delay={28}
          style={{
            marginTop: 8,
            fontSize: 28,
            color: TEXT_PRIMARY,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          不是不交税，而是推迟到对你更有利的时机再交
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 9: Conclusion ──────────────────────────────────────────────────────
const SCENE_9_FRAMES = 150;

const Scene9Conclusion: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_9_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <SpringLabel
          delay={0}
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            marginBottom: 12,
          }}
        >
          结论
        </SpringLabel>
        <SpringLabel
          delay={6}
          style={{ fontSize: 30, color: TEXT_SECONDARY, maxWidth: 900 }}
        >
          自雇 vs 设立公司，不是风格问题，而是
          <span style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>数字问题</span>
        </SpringLabel>
        <SpringLabel
          delay={16}
          style={{
            marginTop: 12,
            padding: "20px 28px",
            borderLeft: `6px solid #4ADE80`,
            backgroundColor: "rgba(74,222,128,0.07)",
            borderRadius: 8,
            fontSize: 30,
            color: TEXT_PRIMARY,
            lineHeight: 1.8,
          }}
        >
          年净利润 &lt; 6 万 → 建议保持自雇
        </SpringLabel>
        <SpringLabel
          delay={26}
          style={{
            padding: "20px 28px",
            borderLeft: `6px solid ${ACCENT}`,
            backgroundColor: "rgba(240,180,41,0.07)",
            borderRadius: 8,
            fontSize: 30,
            color: TEXT_PRIMARY,
            lineHeight: 1.8,
          }}
        >
          年净利润 &gt; 8 万 且有盈余可不动 → 值得考虑公司结构
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Scene 10: Section 2 preview ──────────────────────────────────────────────
const SCENE_10_FRAMES = 120;

const Scene10Section2: React.FC = () => {
  return (
    <SceneWrap durationInFrames={SCENE_10_FRAMES}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <SpringLabel
          delay={0}
          style={{ fontSize: 28, color: ACCENT, fontWeight: 600 }}
        >
          二
        </SpringLabel>
        <SpringLabel
          delay={5}
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            lineHeight: 1.4,
          }}
        >
          公司结构下，最重要的决策：
        </SpringLabel>
        <SpringLabel
          delay={12}
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: ACCENT,
            lineHeight: 1.3,
          }}
        >
          如何从公司取钱？
        </SpringLabel>
        <SpringLabel
          delay={20}
          style={{
            marginTop: 16,
            fontSize: 28,
            color: TEXT_SECONDARY,
            maxWidth: 860,
            lineHeight: 1.7,
          }}
        >
          这个决策直接影响你每年实际缴纳多少税
        </SpringLabel>
      </AbsoluteFill>
    </SceneWrap>
  );
};

// ─── Main Composition ─────────────────────────────────────────────────────────

export const TaxGuide: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_1_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene1Title />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_2_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene2SectionHeader />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_3_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene3Misconception />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_4_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene4CoreLogic />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_5_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene5LowIncome />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_6_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene6TaxComparison />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_7_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene7HighIncome />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_8_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene8TaxDeferral />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_9_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene9Conclusion />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_10_FRAMES} premountFor={TRANSITION_FRAMES}>
          <Scene10Section2 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export const TAX_GUIDE_DURATION =
  SCENE_1_FRAMES +
  SCENE_2_FRAMES +
  SCENE_3_FRAMES +
  SCENE_4_FRAMES +
  SCENE_5_FRAMES +
  SCENE_6_FRAMES +
  SCENE_7_FRAMES +
  SCENE_8_FRAMES +
  SCENE_9_FRAMES +
  SCENE_10_FRAMES;
