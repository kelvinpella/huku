import { mutate } from "swr";

/**
 * Revalidates all SWR cache entries whose keys include any of the provided partial keys.
 *
 * This function iterates over all SWR cache keys and triggers a revalidation (mutate)
 * for each key that contains at least one of the specified partial key substrings.
 *
 * @param partialKeys - An array of string fragments to match against SWR cache keys.
 *                      Any cache key containing one of these fragments will be revalidated.
 * @returns A promise that resolves when all matching cache entries have been revalidated.
 */

export async function revalidateSwrPartialKeys(partialKeys: string[]) {
  await mutate((key: string) =>
    partialKeys.some((partialKey) => key.includes(partialKey))
  );
}


