import { useLanguage } from './LanguageProvider'
// Swap only the right eye's pixels during a wink so the rest of the robot stays still.
export default function GlassesIllustration() {
  const { t } = useLanguage()
  return (
    <svg className="glasses-illustration" viewBox="0 0 1254 1254" role="img" aria-label={t("Caffeine Protocol robot holding coffee, wearing glasses, and occasionally winking")}>
      <defs>
        <clipPath id="robot-wink-area">
          <rect x="818" y="398" width="92" height="96" />
        </clipPath>
      </defs>
      <image href="/assets/caffeine-robot-about.png" width="1254" height="1254" />
      <g className="robot-wink" clipPath="url(#robot-wink-area)">
        <image href="/assets/caffeine-robot-wink.png" y="7" width="1254" height="1254" />
      </g>
    </svg>
  )
}
