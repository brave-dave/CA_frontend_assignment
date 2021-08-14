import { Box } from "@material-ui/core";
import CharacterCard from "../../cards/CharacterCard";
import { Pagination } from "../../components/Pagination";
import useCurrentPage from "../../hooks/useCurrentPage";
import usePageData, {
  isPageDataLoading,
  isPageDataNotFound,
} from "../../hooks/usePageData";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";

export default function CharactersListPage() {
  const page = useCurrentPage();
  const pageData = usePageData({ page });

  if (isPageDataLoading(pageData)) return <LoadingPage />;
  if (isPageDataNotFound(pageData)) return <ErrorPage />;

  const { content, currentPage, pages = currentPage } = pageData;

  return (
    <Box>
      <Pagination pages={pages} currentPage={currentPage}>
        {content.map((props) => (
          <CharacterCard key={props.id} {...props} />
        ))}
      </Pagination>
    </Box>
  );
}
