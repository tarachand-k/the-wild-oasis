import React from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaidConfirm, setIsPaidConfirm] = React.useState(false);
  const [wantBreakfast, setWantBreakfast] = React.useState(false);
  const moveBack = useMoveBack();
  const [booking, isLoadingBooking] = useBooking();
  const [settings, isLoadingSettings] = useSettings();
  const { checkIn, isCheckingIn } = useCheckIn();

  React.useEffect(() => setIsPaidConfirm(booking?.isPaid ?? false), [booking]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckIn() {
    if (!isPaidConfirm) return;

    if (wantBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId });
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={wantBreakfast}
            onChange={() => {
              setWantBreakfast((curr) => !curr);
              setIsPaidConfirm(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaidConfirm}
          onChange={() => setIsPaidConfirm((confirm) => !confirm)}
          id={bookingId}
          disabled={isPaidConfirm || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount{" "}
          {!wantBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(breakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          style={{ marginRight: "auto" }}
          variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
        <Button
          onClick={handleCheckIn}
          disabled={!isPaidConfirm || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
