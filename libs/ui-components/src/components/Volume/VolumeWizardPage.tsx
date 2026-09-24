import { useNavigate, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  PageSection,
  Stack,
  Title,
} from '@patternfly/react-core';

import { useTranslation } from '@osac/ui-components/hooks/useTranslation';

const VOLUMES_LIST_PATH = '/storage/volumes';

const VolumeWizardPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  return (
    <PageSection hasBodyWrapper={false}>
      <Stack hasGutter>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button variant="link" isInline onClick={() => navigate(VOLUMES_LIST_PATH)}>
              {t('Volumes')}
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{isEdit ? t('Edit') : t('Create')}</BreadcrumbItem>
        </Breadcrumb>
        <Title headingLevel="h1" size="3xl">
          {isEdit ? t('Edit volume') : t('Create volume')}
        </Title>
      </Stack>
    </PageSection>
  );
};

export default VolumeWizardPage;
