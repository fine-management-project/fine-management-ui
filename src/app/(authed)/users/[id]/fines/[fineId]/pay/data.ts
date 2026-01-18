import { PaymentService } from "@/lib/api/PaymentService/PaymentService";
import { ApiError, PageData } from "@/lib/api/types";
import { wrapServerSideFetching } from "@/lib/api/utils";
import { createServerSession } from "@/lib/session/server";
import { AxiosError } from "axios";

export const getPageData = wrapServerSideFetching<PageData<string>, string>(
  async (id: string): Promise<PageData<string>> => {
    try {
      const session = await createServerSession();
      const service = new PaymentService(session);

      const { data } = await service.requestPaymentForFineById(id);

      return {
        data,
      };
    } catch (e) {
      return {
        data: null,
        error: e as AxiosError<ApiError>,
      };
    }
  }
);
