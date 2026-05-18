import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

test.describe("웹 접근성 자동화 테스트 (Web Accessibility Test)", () => {
  test("메인 페이지 접근성 검사", async ({ page }) => {
    // 1. 메인 페이지 이동 (baseURL 기준)
    await page.goto("./");

    // 2. 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState("networkidle");

    // 3. AxeBuilder를 사용하여 접근성 스캔 실행
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]) // WCAG A/AA 및 Best Practice 가이드라인 적용
      .analyze();

    const violations = accessibilityScanResults.violations;

    // 4. 접근성 결함(violations)이 발견되었을 경우, 에러 리포트 파일 추출 및 로그 출력
    if (violations.length > 0) {
      console.log("❌ [접근성 위반 사항이 발견되었습니다]");

      // 프로젝트 루트 경로에 accessibility-violations.json 리포트 파일 생성
      const reportPath = path.join(process.cwd(), "accessibility-violations.json");
      fs.writeFileSync(reportPath, JSON.stringify(violations, null, 2), "utf-8");
      console.log(`📝 접근성 위반 리포트가 성공적으로 추출되었습니다: ${reportPath}`);

      violations.forEach((violation, index) => {
        console.log(`\n[${index + 1}] ID: ${violation.id} (${violation.impact}) - ${violation.help}`);
        console.log(`   설명: ${violation.description}`);
        console.log(`   도움말 URL: ${violation.helpUrl}`);
        violation.nodes.forEach((node) => {
          console.log(`   - 대상 요소 HTML: ${node.html}`);
          if (node.failureSummary) {
            console.log(`     실패 원인: ${node.failureSummary}`);
          }
        });
      });
    }

    // 5. 검증 (결함 개수가 0개여야 함)
    expect(violations).toEqual([]);
  });
});
