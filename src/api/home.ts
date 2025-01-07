import Alova from '@/utils/core/alova';

const AlovaInstance = Alova();

export const getProductList = (params: {}) => AlovaInstance.Get('/api/v1/combo/list_products_v3', {params});
