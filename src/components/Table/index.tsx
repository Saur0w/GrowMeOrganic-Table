import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchArtworks } from '../../services/Service.tsx';
import type {Artwork} from '../../types/index.types.ts';
import styles from './style.module.scss';

export const Index: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(false);

    const [first, setFirst] = useState(0);
    const [rows] = useState(12);
    const [totalRecords, setTotalRecords] = useState(0);

    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const currentPage = Math.floor(first / rows) + 1;

    useEffect(() => {
        loadArtworks(currentPage);
    }, [currentPage]);

    const loadArtworks = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetchArtworks(page);
            setArtworks(response.data);
            setTotalRecords(response.pagination.total);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (event: { first: number }) => {
        setFirst(event.first);
    };

    const onSelectionChange = (e: { value: Artwork[] }) => {
        const selected: Artwork[] = e.value;
        const newSelectedIds = new Set(selectedIds);

        const currentPageIds = artworks.map(artwork => artwork.id);

        currentPageIds.forEach(id => newSelectedIds.delete(id));

        selected.forEach(artwork => newSelectedIds.add(artwork.id));

        setSelectedIds(newSelectedIds);
    };

    const getSelectedRows = (): Artwork[] => {
        return artworks.filter(artwork => selectedIds.has(artwork.id));
    };

    return (
        <div className={styles.page}>

            <DataTable
                value={artworks}
                lazy
                paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPage={onPageChange}
                loading={loading}
                dataKey="id"
                selection={getSelectedRows()}
                onSelectionChange={onSelectionChange}
                selectionMode="checkbox"
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column selectionMode="multiple" className={styles.selection} />
                <Column field="title" header="Title" className={styles.title} />
                <Column field="place_of_origin" header="Place of Origin" className={styles.place}  />
                <Column field="artist_display" header="Artist" className={styles.artist} />
                <Column field="inscriptions" header="Inscriptions" className={styles.ins} />
                <Column field="date_start" header="Date Start" className={styles.dateStart} />
                <Column field="date_end" header="Date End" className={styles.dateEnd} />
            </DataTable>
        </div>
    );
};
