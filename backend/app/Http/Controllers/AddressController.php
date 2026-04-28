<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Traits\ApiResponseTrait; //? ← imports the file (like include)

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    use ApiResponseTrait; //? ← actually APPLIES the trait to this class

    public function getAddresses()
    {
        try {
            //? where() -> built in function for finding identical id in a table.
            $addresses = Address::where('user_id', Auth::id())->get();

            return response()->json(['message' => 'Successfully retrieved the address/es', 'addresses' => $addresses], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function addAddress(Request $request)
    {
        try {

            $request->validate([
                'full_name' => 'required',
                'address_line1' => 'required',
                'city' => 'required',
                'zip_code' => 'required',
            ]);

            $address = Address::create([
                'user_id' => Auth::id(),
                'label' => $request->label,
                'full_name' => $request->full_name,
                'phone' => $request->phone,
                'address_line1' => $request->address_line1,
                'address_line2' => $request->address_line2,
                'city' => $request->city,
                'province' => $request->province,
                'zip_code' => $request->zip_code,
                'country' => $request->country ?? 'Philippines',
            ]);

            return response()->json(['message' => 'Address added successfully', 'address' => $address], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function updateAddress(Request $request, $id)
    {
        try {
            $address = Address::findOrFail($id);

            if ($address->user_id !== Auth::id()) {
                return response()->json(['message' => 'Action Invalid, Unauthorized!'], 403);
            }

            $address->update([
                'label' => $request->label ?? $address->label,
                'full_name' => $request->full_name ?? $address->full_name,
                'phone' => $request->phone ?? $address->phone,
                'address_line1' => $request->address_line1 ?? $address->address_line1,
                'address_line2' => $request->address_line2 ?? $address->address_line2,
                'city' => $request->city ?? $address->city,
                'province' => $request->province ?? $address->province,
                'zip_code' => $request->zip_code ?? $address->zip_code,
                'country' => $request->country ?? $address->country,
            ]);

            return response()->json(['message' => 'Address updated successfully.'], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function deleteAddress($id)
    {
        try {
            $address = Address::findOrFail($id);

            //? Checks if the adress from table is the same w the data in it.
            if ($address->user_id !== Auth::id()) {
                return response()->json(['message' => 'Action Invalid, Unauthorized!'], 403);
            }

            $address->delete();

            return response()->json(['message' => 'Address removed successfully.'], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function setDefault($id)
    {
        try {

            $address = Address::findOrFail($id);

            if ($address->user_id !== Auth::id()) {
                return response()->json(['message' => 'Action Invalid, Unauthorized!'], 403);
            }

            //? checks if the current address if is_default column is already true.
            if ($address->is_default) {
                return response()->json(['message' => 'Already set as default!!'], 200);
            }

            Address::where('user_id', Auth::id())->update(['is_default' => false]);
            $address->update(['is_default' => true]);

            return response()->json(['message' => 'Default Address is set up successfully.'], 200);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
