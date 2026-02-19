import Swal from "sweetalert2";

export const deleteSwal=async()=>{
        const result = await Swal.fire({
                    title: "Are you sure?",
                    text: "Your deleting this item, cannot undone!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it",
                    cancelButtonText: "Cancel",
                });
        
        return result;
}