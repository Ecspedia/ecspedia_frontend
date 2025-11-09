interface MultipleServicesFormProps {
    serviceSelector: React.ReactNode;
    serviceForm?: React.ReactNode;
}

const MultipleServicesForm = (multipleServicesFormProps:
    MultipleServicesFormProps) => {
    const { serviceSelector, serviceForm } = multipleServicesFormProps;

    return (
        <div className="border-border mt-5 flex flex-col rounded-lg border">
            <div className="mx-auto">
                {serviceSelector}
            </div>
            <hr className="border-border w-full border-t" />
            {serviceForm}
        </div>
    );
};

export default MultipleServicesForm;