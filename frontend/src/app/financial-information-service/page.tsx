import InstitutionalSolutionSimplePage, {
  institutionalSolutionMetadata,
} from '@/components/institutional/InstitutionalSolutionSimplePage';
import { FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT } from '@/lib/institutionalSolutions';

const d = FINANCIAL_INFORMATION_SERVICE_PAGE_DEFAULT;

export const metadata = institutionalSolutionMetadata(d.title, d.subtitle, d.bullets);

export default function FinancialInformationServicePage() {
  return <InstitutionalSolutionSimplePage {...d} />;
}
