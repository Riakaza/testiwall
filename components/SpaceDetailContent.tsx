"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n-context";
import { TestimonialManager } from "@/components/TestimonialManager";
import { LogoutButton } from "@/components/LogoutButton";
import { CopyButton } from "@/components/CopyButton";
import { InviteCopyButton } from "@/components/InviteCopyButton";
import { CollectButtonCode } from "@/components/CollectButtonCode";
import { EmbedInstructions } from "@/components/EmbedInstructions";
import { ImportCSV } from "@/components/ImportCSV";
import { ExportCSV } from "@/components/ExportCSV";
import { EditSpaceForm } from "@/components/EditSpaceForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Testimonial } from "@/lib/types";

interface SpaceDetailContentProps {
  space: {
    id: string;
    name: string;
    slug: string;
    question: string;
    thank_you_msg: string;
  };
  testimonials: Testimonial[];
  collectUrl: string;
  embedUrl: string;
  baseUrl: string;
  ownerPlan: string;
}

export function SpaceDetailContent({
  space,
  testimonials,
  collectUrl,
  embedUrl,
  baseUrl,
  ownerPlan,
}: SpaceDetailContentProps) {
  const { t } = useTranslation();

  const testimonialCount = testimonials.length;
  const approvedCount = testimonials.filter((t) => t.status === "approved").length;
  const pendingCount = testimonials.filter((t) => t.status === "pending").length;
  const collectedCount = testimonials.filter((t) => t.status !== "unverified").length;
  const showPlanLimitBanner =
    ownerPlan !== "pro" && collectedCount >= 12 && testimonialCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/20">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          </Link>
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            <span className="text-accent">Testi</span>Wall
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-700 truncate max-w-[150px] sm:max-w-none">{space.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </nav>

        {showPlanLimitBanner && (
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-accent text-white px-2.5 py-1 rounded-full w-fit">
              Pro
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{t("planLimit.title")}</p>
              <p className="text-sm text-gray-500 mt-0.5">{t("planLimit.desc")}</p>
            </div>
            <Link
              href="/pro"
              className="flex-shrink-0 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20"
            >
              {t("planLimit.cta")}
            </Link>
          </div>
        )}

        <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight">{testimonialCount}</p>
            <p className="text-sm text-gray-500 mt-1">{t("spaceDetail.totalReceived")}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-emerald-600">{approvedCount}</p>
            <p className="text-sm text-gray-500 mt-1">{t("spaceDetail.approved")}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-amber-500">{pendingCount}</p>
            <p className="text-sm text-gray-500 mt-1">{t("spaceDetail.pending")}</p>
          </div>
        </div>

        {testimonialCount === 0 ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{t("spaceDetail.howItWorks")}</h2>
              <p className="text-gray-500 mb-8">
                {t("spaceDetail.howItWorksDesc")}
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 bg-accent text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-accent/20">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{t("spaceDetail.step1Title")}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {t("spaceDetail.step1Desc")}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                        {collectUrl}
                      </code>
                      <CopyButton text={collectUrl} />
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <a
                        href={`/collect/${space.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-accent font-medium hover:underline"
                      >
                        {t("spaceDetail.viewForm")}
                      </a>
                      <InviteCopyButton collectUrl={collectUrl} spaceName={space.name} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="flex-shrink-0 w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-400">{t("spaceDetail.step2Title")}</h3>
                    <p className="text-sm text-gray-400">
                      {t("spaceDetail.step2Desc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-50">
                  <div className="flex-shrink-0 w-9 h-9 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-400">{t("spaceDetail.step3Title")}</h3>
                    <p className="text-sm text-gray-400">
                      {t("spaceDetail.step3Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
              <p className="text-sm text-accent-dark">
                <strong>{t("spaceDetail.tip")}</strong> {t("spaceDetail.tipContent")}
              </p>
            </div>

            <EditSpaceForm
              spaceId={space.id}
              name={space.name}
              question={space.question}
              thankYouMsg={space.thank_you_msg}
            />

            <TestimonialManager
              testimonials={testimonials}
              spaceId={space.id}
              spaceSlug={space.slug}
            />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-1">{t("spaceDetail.collectLink")}</h3>
                <p className="text-sm text-gray-500 mb-3">{t("spaceDetail.collectLinkDesc")}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                    {collectUrl}
                  </code>
                  <CopyButton text={collectUrl} />
                </div>
                <div className="mt-3">
                  <InviteCopyButton collectUrl={collectUrl} spaceName={space.name} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{t("spaceDetail.wallOfLove")}</h3>
                  <p className="text-sm text-gray-500 mb-3">{t("spaceDetail.wallOfLoveDesc")}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm break-all font-mono">
                      {`${baseUrl}/p/${space.slug}`}
                    </code>
                    <CopyButton text={`${baseUrl}/p/${space.slug}`} />
                  </div>
                  <a
                    href={`/p/${space.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-accent text-accent rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-accent/5 transition-colors"
                  >
                    {t("spaceDetail.viewWall")}
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-1">{t("spaceDetail.embedButton")}</h3>
                  <p className="text-sm text-gray-500 mb-3">{t("spaceDetail.embedButtonDesc")}</p>
                  <CollectButtonCode collectUrl={collectUrl} />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">{t("spaceDetail.displayOnSite")}</h3>
                <p className="text-sm text-gray-500 mb-4">{t("spaceDetail.displayOnSiteDesc")}</p>
                <EmbedInstructions embedUrl={embedUrl} slug={space.slug} />
              </div>
            </div>

            <EditSpaceForm
              spaceId={space.id}
              name={space.name}
              question={space.question}
              thankYouMsg={space.thank_you_msg}
            />

            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1">{t("spaceDetail.importExport")}</h3>
              <p className="text-sm text-gray-500 mb-3">{t("spaceDetail.importExportDesc")}</p>
              <p className="text-xs text-gray-400 mb-4">{t("spaceDetail.csvFormat")}</p>
              <div className="flex flex-wrap gap-3">
                <ImportCSV spaceId={space.id} />
                <ExportCSV testimonials={testimonials} spaceName={space.slug} />
              </div>
            </div>

            <TestimonialManager
              testimonials={testimonials}
              spaceId={space.id}
              spaceSlug={space.slug}
            />
          </>
        )}
      </main>
    </div>
  );
}
