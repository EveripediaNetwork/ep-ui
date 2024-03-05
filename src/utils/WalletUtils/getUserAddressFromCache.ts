/**
 * @deprecated since version 1.0.0. Will be removed in version 2.0.0. Use `useAddress` hook for a more reliable and up-to-date method of retrieving user addresses.
 *
 * Example usage of the new method:
 * ```typescript
 * import { useAddress } from '[path_to_useAddress_hook]';
 *
 * const Component = () => {
 *   const { address } = useAddress();
 *   // Use `address` as needed
 *   return <div>User Address: {address}</div>;
 * }
 * ```
 */
export const getUserAddressFromCache = (): string | null => {
  try {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('wagmi.store')
      const parsedData = JSON.parse(storedData as string)
      if (parsedData?.state?.data) {
        return parsedData.state.data?.account
      }
    }
  } catch (_e) {
    return null
  }
  return null
}
